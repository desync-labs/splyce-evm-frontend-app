import {
  API_ETH_MOCK_ADDRESS,
  gasLimitRecommendations,
  ProtocolAction,
} from "@into-the-fathom/lending-contract-helpers";
import { SignatureLike } from "@into-the-fathom/bytes";
import { BoxProps } from "@mui/material";
import { useParaSwapTransactionHandler } from "apps/lending/helpers/useParaSwapTransactionHandler";
import { ComputedReserveData } from "apps/lending/hooks/app-data-provider/useAppDataProvider";
import {
  calculateSignedAmount,
  SwapTransactionParams,
} from "apps/lending/hooks/paraswap/common";
import { useRootStore } from "apps/lending/store/root";

import { TxActionsWrapper } from "apps/lending/components/transactions/TxActionsWrapper";

interface SwapBaseProps extends BoxProps {
  amountToSwap: string;
  amountToReceive: string;
  poolReserve: ComputedReserveData;
  targetReserve: ComputedReserveData;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  symbol: string;
  blocked: boolean;
  isMaxSelected: boolean;
  useFlashLoan: boolean;
  loading?: boolean;
  signature?: SignatureLike;
  deadline?: string;
  signedAmount?: string;
}

export interface SwapActionProps extends SwapBaseProps {
  swapCallData: string;
  augustus: string;
}

export const SwapActions = ({
  amountToSwap,
  amountToReceive,
  isWrongNetwork,
  sx,
  poolReserve,
  targetReserve,
  isMaxSelected,
  useFlashLoan,
  loading,
  symbol,
  blocked,
  buildTxFn,
  ...props
}: SwapBaseProps & { buildTxFn: () => Promise<SwapTransactionParams> }) => {
  const [swapCollateral, currentMarketData] = useRootStore((state) => [
    state.swapCollateral,
    state.currentMarketData,
  ]);

  const {
    approval,
    action,
    approvalTxState,
    mainTxState,
    loadingTxns,
    requiresApproval,
  } = useParaSwapTransactionHandler({
    protocolAction: ProtocolAction.swapCollateral,
    handleGetTxns: async (signature, deadline) => {
      const route = await buildTxFn();
      return swapCollateral({
        amountToSwap: route.inputAmount,
        amountToReceive: route.outputAmount,
        poolReserve,
        targetReserve,
        isWrongNetwork,
        symbol,
        blocked,
        isMaxSelected,
        useFlashLoan,
        swapCallData: route.swapCallData,
        augustus: route.augustus,
        signature,
        deadline,
        signedAmount: calculateSignedAmount(amountToSwap, poolReserve.decimals),
      });
    },
    handleGetApprovalTxns: async () => {
      return swapCollateral({
        amountToSwap,
        amountToReceive,
        poolReserve,
        targetReserve,
        isWrongNetwork,
        symbol,
        blocked,
        isMaxSelected,
        useFlashLoan: false,
        swapCallData: "0x",
        augustus: API_ETH_MOCK_ADDRESS,
      });
    },
    gasLimitRecommendation:
      gasLimitRecommendations[ProtocolAction.swapCollateral].limit,
    skip: loading || !amountToSwap || parseFloat(amountToSwap) === 0,
    spender: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER ?? "",
    deps: [targetReserve.symbol, amountToSwap],
  });

  return (
    <TxActionsWrapper
      mainTxState={mainTxState}
      approvalTxState={approvalTxState}
      isWrongNetwork={isWrongNetwork}
      preparingTransactions={loadingTxns}
      handleAction={action}
      requiresAmount
      amount={amountToSwap}
      handleApproval={() =>
        approval({
          amount: calculateSignedAmount(amountToSwap, poolReserve.decimals),
          underlyingAsset: poolReserve.fmTokenAddress,
        })
      }
      requiresApproval={requiresApproval}
      actionText={<>Switch</>}
      actionInProgressText={<>Switching</>}
      sx={sx}
      fetchingData={loading}
      errorParams={{
        loading: false,
        disabled: blocked,
        content: <>Switch</>,
        handleClick: action,
      }}
      tryPermit
      {...props}
    />
  );
};
