import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

export const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  position: "fixed",
  top: 0,
  background: "#0D0D0D",
  borderBottom: "1px solid #072a40",
  borderRadius: 0,
  zIndex: theme.zIndex.drawer - 1,

  "& .MuiToolbar-root": {
    minHeight: "48px",
    width: "100%",
    justifyContent: "space-between",
    gap: "16px",
  },
}));

export default AppBar;
