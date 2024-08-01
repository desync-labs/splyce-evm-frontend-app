import { styled } from "@mui/material/styles";
import { Select } from "@mui/material";
import { BaseTextField } from "components/Base/Form/StyledForm";

import SearchSrc from "assets/svg/search.svg";

export const BaseSearchTextField = styled(BaseTextField)`
  input {
    background: #051926;
    height: 38px;
    color: #7b9ea6;
    border: 1px solid #072a40;
  }
`;

export const BaseFormInputLogo = styled("img")`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 27px;
  left: 9px;
`;

export const SearchFieldLogo = () => {
  return (
    <BaseFormInputLogo
      sx={{ top: "10px", left: "9px" }}
      src={SearchSrc}
      alt="search"
    />
  );
};

export const BaseSortSelect = styled(Select)`
  width: auto;
  height: 40px;
  min-width: 100px;
  background: #051926;
  border: 1px solid #072a40 !important;
  border-radius: 8px;

  & .MuiSelect-select {
    background-color: transparent !important;
  }

  &:hover,
  &:focus {
    border: 1px solid #a8bfb0;
    box-shadow: 0 0 8px #a0f2c4;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid #a8bfb0 !important;
    box-shadow: 0 0 8px #a0f2c4 !important;
  }
  fieldset {
    border: none !important;
    outline: none !important;
  }
`;
