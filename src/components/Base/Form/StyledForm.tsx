import { styled } from "@mui/material/styles";
import {
  Box,
  FormLabel as MuiFormLabel,
  IconButton as MuiButton,
  List as MuiList,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";

export const BaseTextField = styled(MuiTextField)`
  width: 100%;
  padding: 0;
  margin: 0;
  input,
  textarea {
    background: #071028;
    border-radius: 8px;
    height: 40px;
    width: 100%;
    padding: 0 50px 0 35px;
    font-size: 14px;
    line-height: 20px;
    color: #4f658c;
    border: 1px solid #072a40;
    &:hover,
    &:focus {
      border: 1px solid #a8bfb0;
      box-shadow: 0 0 8px #a0f2c4;
    }
  }

  textarea {
    padding: 8px 6px 8px 16px;
    min-height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  input[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }

  & .MuiOutlinedInput-root {
    padding: 0;
  }

  &.MuiTextField-root.MuiFormControl-root {
    margin-top: 0;
    width: 100%;
  }

  & input:disabled,
  textarea:disabled {
    background: unset;
    border: 1px solid #072a40;
    color: #072a40;
    cursor: not-allowed;
    pointer-events: all;
    &:hover,
    &:focus {
      box-shadow: unset;
    }
  }

  & .Mui-error input,
  & .Mui-error textarea {
    color: #f44336;
    text-fill-color: #f44336;
    border: 1px solid #f44336;
  }

  & fieldset {
    border: none;
  }

  .MuiFormHelperText-root {
    margin-left: 0;
    margin-top: 0;
    color: #7b9ea6;
    &.Mui-error {
      color: #dd3c3c;
    }
    p {
      padding-left: 0;
    }
  }
`;

export const BaseDialogFormWrapper = styled(Box)`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #072a40;
  padding: 16px;
`;

export const BaseDialogFormInfoWrapper = styled(Box)`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #072a40;
  padding: 16px;
  margin-top: 8px;
`;

export const BaseFormInputWrapper = styled("div")`
  position: relative;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const BaseFormInputLogo = styled("img")`
  position: absolute;
  top: 36px;
  left: 9px;
  width: 24px;
  height: 24px;
  filter: drop-shadow(0px 4px 40px rgba(0, 7, 21, 0.3));
  border-radius: 50%;

  &.extendedInput {
    top: 43px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 18px;
    height: 18px;
    top: 35px;

    &.extendedInput {
      top: 40px;
    }
  }
`;

export const BaseFormWalletBalance = styled(Typography)`
  font-size: 12px;
  line-height: 16px;
  float: right;
  color: #a0f2c4;
  text-align: end;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 11px;
  }
`;

export const BaseFormInputUsdIndicator = styled("div")`
  position: absolute;
  top: 58px;
  left: 40px;
  color: #7b9ea6;
  font-size: 14px;
  font-weight: 400;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    top: 50px;
    left: 35px;
    font-size: 11px;
  }
`;

export const BaseFormLabelRow = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
  height: 20px;
`;

export const BaseFormInputLabel = styled(MuiFormLabel)`
  color: #7b9ea6;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.44px;
  text-transform: uppercase;
`;

export const BaseFormTextField = styled(MuiTextField)`
  width: 100%;
  margin: 0;
  padding: 4px 0 0;

  input,
  textarea {
    height: 42px;
    width: 100%;
    background: #051926;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    border: 1px solid #072a40;
    border-radius: 8px;
    padding: 0 72px 18px 40px;

    &:hover,
    &:focus {
      border: 1px solid #a8bfb0;
      box-shadow: 0 0 8px #a0f2c4;
    }
  }

  textarea {
    padding: 8px 6px 8px 16px;
    min-height: 20px;
    font-size: 14px;
    line-height: 20px;
  }

  input[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }

  & .MuiOutlinedInput-root {
    padding: 0;
  }

  &.MuiTextField-root.MuiFormControl-root {
    margin-top: 0;
    width: 100%;
  }

  & input:disabled,
  textarea:disabled {
    height: 46px;
    background: unset;
    border: 1px solid #566e99;
    color: #566e99;
    -webkit-text-fill-color: unset;
    cursor: not-allowed;
    pointer-events: all;
    padding: 0 72px 0 40px;

    &:hover,
    &:focus {
      box-shadow: unset;
    }
  }

  & .Mui-error input,
  & .Mui-error textarea {
    color: #f44336;
    text-fill-color: #f44336;
    border: 1px solid #f44336;
  }

  & fieldset {
    border: none;
  }

  .MuiFormHelperText-root {
    margin-left: 0;
    margin-top: 0;
    color: #7b9ea6;

    &.Mui-error {
      color: #dd3c3c;
    }

    p {
      padding-left: 0;
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    input,
    textarea {
      height: 34px;
      font-size: 12px;
      padding: 0 52px 12px 34px;
    }

    & input:disabled,
    textarea:disabled {
      height: 38px;
      padding: 0 52px 0 34px;
    }
  }
`;

export const BaseFormSetMaxButton = styled(MuiButton)`
  position: absolute;
  top: 35px;
  right: 16px;
  height: 40px;
  color: #a0f2c4;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  border-radius: 8px;
  border: 0.7px solid #072a40;
  background: #051926;
  cursor: pointer;
  padding: 8px;

  &:hover {
    border: 0.7px solid #a0f2c4;
    background: #072a40;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    top: 32px;
    right: 8px;
    height: 32px;
    font-size: 11px;
    color: #fff;
    border: 0.7px solid #072a40;
    background: #243454;
  }
`;

export const BaseFormInputErrorWrapper = styled("span")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4px;
`;

export const BaseFormInfoList = styled(MuiList)`
  width: 100%;
  & li {
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    padding: 3px 0;
    span {
      font-size: 14px;
    }
    & div:last-child {
      font-weight: 600;
    }
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    > .MuiListItem-root {
      padding-left: 0;
      > .MuiListItemText-root {
        max-width: 75%;
      }
      .MuiListItemSecondaryAction-root {
        right: 0;
      }
    }
  }
`;
