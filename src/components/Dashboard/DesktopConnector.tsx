import { AppDialog } from "components/AppComponents/AppDialog/AppDialog";
import { FC, useCallback } from "react";
import { DialogContent } from "@mui/material";
import SolflareSrc from "assets/png/solflare-logo.webp";
import PhantomSrc from "assets/svg/phantom.png";
import { styled } from "@mui/material/styles";
import useConnector from "context/connector";

type DesktopConnectorPropsType = {
  onClose: () => void;
};

const Connector = styled("button")`
  background-color: #071028;
  padding: 1rem;
  outline: none;
  border-radius: 12px;
  width: 100% !important;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 7px;
  color: #fff;
  margin-bottom: 10px;
  cursor: pointer;
  height: 56px;

  img {
    width: 24px;
  }
`;

const ConnectorDialogContent = styled(DialogContent)`
  button:last-of-type {
    margin-bottom: 0;
  }
`;

const DesktopConnector: FC<DesktopConnectorPropsType> = ({ onClose }) => {
  const { connectWalletConnect, connectMetamask } = useConnector();

  const walletConnectConnect = useCallback(() => {
    connectWalletConnect();
    onClose();
  }, [onClose, connectWalletConnect]);

  const metamaskConnect = useCallback(() => {
    connectMetamask().then(() => {
      onClose();
    });
  }, [onClose, connectMetamask]);

  return (
    <AppDialog
      onClose={onClose}
      open={true}
      sx={{ "& .MuiPaper-root": { width: "500px" } }}
    >
      <ConnectorDialogContent>
        <Connector onClick={metamaskConnect}>
          <img src={SolflareSrc} alt={"metamask"} />
          Solflare
        </Connector>
        <Connector onClick={walletConnectConnect}>
          <img src={PhantomSrc} alt={"wallet-connect"} />
          Phantom
        </Connector>
      </ConnectorDialogContent>
    </AppDialog>
  );
};

export default DesktopConnector;
