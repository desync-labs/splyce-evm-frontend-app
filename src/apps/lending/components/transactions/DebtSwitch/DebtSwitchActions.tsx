import {
  ApproveDelegationType,
  gasLimitRecommendations,
  ProtocolAction,
} from "@into-the-fathom/lending-contract-helpers";
import { SignatureLike } from "@into-the-fathom/bytes";
import { BoxProps } from "@mui/material";
import { parseUnits } from "fathom-ethers/lib/utils";
import { queryClient } from "apps/lending";
import { useCallback, useEffect, useState } from "react";
import { MOCK_SIGNED_HASH } from "apps/lending/helpers/useTransactionHandler";
import { useBackgroundDataProvider } from "apps/lending/hooks/app-data-provider/BackgroundDataProvider";
import { ComputedReserveData } from "apps/lending/hooks/app-data-provider/useAppDataProvider";
import {
  calculateSignedAmount,
  SwapTransactionParams,
} from "apps/lending/hooks/paraswap/common";
import { useModalContext } from "apps/lending/hooks/useModal";
import { useWeb3Context } from "apps/lending/libs/hooks/useWeb3Context";
import { useRootStore } from "apps/lending/store/root";
import { ApprovalMethod } from "apps/lending/store/walletSlice";
import {
  getErrorTextFromError,
  TxAction,
} from "apps/lending/ui-config/errorMapping";
import { QueryKeys } from "apps/lending/ui-config/queries";

import { TxActionsWrapper } from "apps/lending/components/transactions/TxActionsWrapper";
import {
  APPROVE_DELEGATION_GAS_LIMIT,
  checkRequiresApproval,
} from "apps/lending/components/transactions/utils";

interface DebtSwitchBaseProps extends BoxProps {
  amountToSwap: string;
  amountToReceive: string;
  poolReserve: ComputedReserveData;
  targetReserve: ComputedReserveData;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  symbol?: string;
  blocked?: boolean;
  isMaxSelected: boolean;
  loading?: boolean;
  currentRateMode: number;
  signatureParams?: SignedParams;
}

export interface DebtSwitchActionProps extends DebtSwitchBaseProps {
  augustus: string;
  txCalldata: string;
}

interface SignedParams {
  signature: SignatureLike;
  deadline: string;
  amount: string;
}

export const DebtSwitchActions = ({
  amountToSwap,
  amountToReceive,
  isWrongNetwork,
  sx,
  poolReserve,
  targetReserve,
  isMaxSelected,
  loading,
  blocked,
  buildTxFn,
  currentRateMode,
}: DebtSwitchBaseProps & {
  buildTxFn: () => Promise<SwapTransactionParams>;
}) => {
  const [
    getCreditDelegationApprovedAmount,
    currentMarketData,
    generateApproveDelegation,
    estimateGasLimit,
    addTransaction,
    debtSwitch,
    walletApprovalMethodPreference,
    generateCreditDelegationSignatureRequest,
  ] = useRootStore((state) => [
    state.getCreditDelegationApprovedAmount,
    state.currentMarketData,
    state.generateApproveDelegation,
    state.estimateGasLimit,
    state.addTransaction,
    state.debtSwitch,
    state.walletApprovalMethodPreference,
    state.generateCreditDelegationSignatureRequest,
  ]);
  const {
    approvalTxState,
    mainTxState,
    loadingTxns,
    setMainTxState,
    setTxError,
    setGasLimit,
    setLoadingTxns,
    setApprovalTxState,
  } = useModalContext();
  const { sendTx, signTxData } = useWeb3Context();
  const { refetchPoolData, refetchIncentiveData } = useBackgroundDataProvider();
  const [requiresApproval, setRequiresApproval] = useState<boolean>(false);
  const [approvedAmount, setApprovedAmount] = useState<
    ApproveDelegationType | undefined
  >();
  const [useSignature, setUseSignature] = useState(false);
  const [signatureParams, setSignatureParams] = useState<
    SignedParams | undefined
  >();

  const approvalWithSignatureAvailable = currentMarketData.v3;

  useEffect(() => {
    const preferSignature =
      walletApprovalMethodPreference === ApprovalMethod.PERMIT;
    setUseSignature(preferSignature);
  }, [walletApprovalMethodPreference]);

  const approval = async () => {
    try {
      if (requiresApproval && approvedAmount) {
        const approveDelegationAmount = calculateSignedAmount(
          amountToReceive,
          targetReserve.decimals,
          0.25
        );
        if (useSignature && approvalWithSignatureAvailable) {
          const deadline = Math.floor(Date.now() / 1000 + 3600).toString();
          const signatureRequest =
            await generateCreditDelegationSignatureRequest({
              underlyingAsset: targetReserve.variableDebtTokenAddress,
              deadline,
              amount: approveDelegationAmount,
              spender: currentMarketData.addresses.DEBT_SWITCH_ADAPTER ?? "",
            });
          const response = await signTxData(signatureRequest);
          setSignatureParams({
            signature: response,
            deadline,
            amount: approveDelegationAmount,
          });
          setApprovalTxState({
            txHash: MOCK_SIGNED_HASH,
            loading: false,
            success: true,
          });
        } else {
          let approveDelegationTxData = generateApproveDelegation({
            debtTokenAddress: targetReserve.variableDebtTokenAddress,
            delegatee: currentMarketData.addresses.DEBT_SWITCH_ADAPTER ?? "",
            amount: approveDelegationAmount,
          });
          setApprovalTxState({ ...approvalTxState, loading: true });
          approveDelegationTxData = await estimateGasLimit(
            approveDelegationTxData
          );
          const response = await sendTx(approveDelegationTxData);
          await response.wait(1);
          setApprovalTxState({
            txHash: response.hash,
            loading: false,
            success: true,
          });
          addTransaction(response.hash, {
            action: ProtocolAction.approval,
            txState: "success",
            asset: targetReserve.variableDebtTokenAddress,
            amount: approveDelegationAmount,
            assetName: "varDebt" + targetReserve.name,
            spender: currentMarketData.addresses.DEBT_SWITCH_ADAPTER,
          });
          setTxError(undefined);
          fetchApprovedAmount(true);
        }
      }
    } catch (error) {
      const parsedError = getErrorTextFromError(
        error,
        TxAction.GAS_ESTIMATION,
        false
      );
      setTxError(parsedError);
      if (!approvalTxState.success) {
        setApprovalTxState({
          txHash: undefined,
          loading: false,
        });
      }
    }
  };
  const action = async () => {
    try {
      setMainTxState({ ...mainTxState, loading: true });
      const route = await buildTxFn();
      let debtSwitchTxData = debtSwitch({
        poolReserve,
        targetReserve,
        currentRateMode: currentRateMode,
        amountToReceive: parseUnits(
          route.inputAmount,
          targetReserve.decimals
        ).toString(),
        amountToSwap: parseUnits(
          route.outputAmount,
          poolReserve.decimals
        ).toString(),
        isMaxSelected,
        txCalldata: route.swapCallData,
        augustus: route.augustus,
        signatureParams,
        isWrongNetwork,
      });
      debtSwitchTxData = await estimateGasLimit(debtSwitchTxData);
      const response = await sendTx(debtSwitchTxData);
      await response.wait(1);
      setMainTxState({
        txHash: response.hash,
        loading: false,
        success: true,
      });
      addTransaction(response.hash, {
        action: "debtSwitch",
        txState: "success",
        previousState:
          route.outputAmount +
          (currentRateMode === 2
            ? " variable" + poolReserve.symbol
            : " stable" + poolReserve.symbol),
        newState: route.inputAmount + " variable" + targetReserve.symbol,
      });

      queryClient.invalidateQueries({ queryKey: [QueryKeys.POOL_TOKENS] });
      refetchPoolData && refetchPoolData();
      refetchIncentiveData && refetchIncentiveData();
    } catch (error) {
      const parsedError = getErrorTextFromError(
        error,
        TxAction.GAS_ESTIMATION,
        false
      );
      setTxError(parsedError);
      setMainTxState({
        txHash: undefined,
        loading: false,
      });
    }
  };

  // callback to fetch approved credit delegation amount and determine execution path on dependency updates
  const fetchApprovedAmount = useCallback(
    async (forceApprovalCheck?: boolean) => {
      // Check approved amount on-chain on first load or if an action triggers a re-check such as an approveDelegation being confirmed
      let approval = approvedAmount;
      if (approval === undefined || forceApprovalCheck) {
        setLoadingTxns(true);
        approval = await getCreditDelegationApprovedAmount({
          debtTokenAddress: targetReserve.variableDebtTokenAddress,
          delegatee: currentMarketData.addresses.DEBT_SWITCH_ADAPTER ?? "",
        });
        setApprovedAmount(approval);
      } else {
        setRequiresApproval(false);
        setApprovalTxState({});
      }

      if (approval) {
        const fetchedRequiresApproval = checkRequiresApproval({
          approvedAmount: approval.amount,
          amount: amountToReceive,
          signedAmount: "0",
        });
        setRequiresApproval(fetchedRequiresApproval);
        if (fetchedRequiresApproval) setApprovalTxState({});
      }

      setLoadingTxns(false);
    },
    [
      approvedAmount,
      setLoadingTxns,
      getCreditDelegationApprovedAmount,
      targetReserve.variableDebtTokenAddress,
      currentMarketData.addresses.DEBT_SWITCH_ADAPTER,
      setApprovalTxState,
      amountToReceive,
    ]
  );

  // Run on first load and when the target reserve changes
  useEffect(() => {
    if (amountToSwap === "0") return;

    if (!approvedAmount) {
      fetchApprovedAmount();
    } else if (
      approvedAmount.debtTokenAddress !== targetReserve.variableDebtTokenAddress
    ) {
      fetchApprovedAmount(true);
    }
  }, [
    amountToSwap,
    approvedAmount,
    fetchApprovedAmount,
    targetReserve.variableDebtTokenAddress,
  ]);

  // Update gas estimation
  useEffect(() => {
    let switchGasLimit = 0;
    switchGasLimit = Number(
      gasLimitRecommendations[ProtocolAction.borrow].recommended
    );
    if (requiresApproval && !approvalTxState.success) {
      switchGasLimit += Number(APPROVE_DELEGATION_GAS_LIMIT);
    }
    setGasLimit(switchGasLimit.toString());
  }, [requiresApproval, approvalTxState, setGasLimit]);

  return (
    <TxActionsWrapper
      mainTxState={mainTxState}
      approvalTxState={approvalTxState}
      isWrongNetwork={isWrongNetwork}
      preparingTransactions={loadingTxns}
      handleAction={action}
      requiresAmount
      amount={amountToSwap}
      handleApproval={() => approval()}
      requiresApproval={requiresApproval}
      actionText={<>Switch</>}
      actionInProgressText={<>Switching</>}
      sx={sx}
      fetchingData={loading}
      errorParams={{
        loading: false,
        disabled: blocked || !approvalTxState?.success,
        content: <>Switch</>,
        handleClick: action,
      }}
      blocked={blocked}
      tryPermit={approvalWithSignatureAvailable}
    />
  );
};
