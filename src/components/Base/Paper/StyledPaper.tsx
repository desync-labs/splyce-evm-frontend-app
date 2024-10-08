import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const BasePaper = styled(Paper)`
  background: #072a40;
  border: 1px solid #101d32;
  border-radius: 8px;
`;
export const BasePreviewModalPaper = styled(BasePaper)`
  border-radius: 16px;
  border: 1px solid #072a40;
  background: #051926;
  padding: 0;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    border-radius: 12px;
  }
`;
