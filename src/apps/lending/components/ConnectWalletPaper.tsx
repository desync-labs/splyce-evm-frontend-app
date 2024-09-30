import { CircularProgress, Paper, PaperProps, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { ConnectWalletButton } from "apps/lending/components/WalletConnection/ConnectWalletButton";

import SplyceAppLogoSrc from "assets/png/splyce-logo.png";

interface ConnectWalletPaperProps extends PaperProps {
  loading?: boolean;
  description?: ReactNode;
}

export const ConnectWalletPaper: FC<ConnectWalletPaperProps> = ({
  loading,
  description,
  sx,
  ...rest
}) => {
  return (
    <Paper
      {...rest}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 2,
        flex: 1,
        ...sx,
      }}
    >
      <>
        <img
          src={SplyceAppLogoSrc}
          width={160}
          style={{ margin: "40px 0" }}
          alt={"Splyce logo"}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h2" sx={{ color: "#c5d7f2", mb: 1 }}>
              Please, connect your wallet
            </Typography>
            <Typography sx={{ mb: 3 }} color="text.secondary">
              {description ||
                "Please connect your wallet to see your supplies, borrowings,\n" +
                  "                  and open positions."}
            </Typography>
            <ConnectWalletButton />
          </>
        )}
      </>
    </Paper>
  );
};
