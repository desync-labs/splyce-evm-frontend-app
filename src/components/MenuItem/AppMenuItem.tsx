import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";
import { FC, useState, memo } from "react";
import { ListItemText } from "@mui/material";
import AppMenuItemComponent from "components/MenuItem/AppMenuItemComponent";

// React runtime PropTypes
export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  isActive: PropTypes.bool,
  target: PropTypes.string,
};

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypesType = PropTypes.InferProps<
  typeof AppMenuItemPropTypes
>;
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypesType, "items">;

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
  items?: AppMenuItemProps[];
};

const useStyles = makeStyles<{ isActive: boolean }>()(
  (theme, { isActive }) => ({
    menuItem: {
      width: "fit-content",
      minWidth: "64px",
      borderRadius: "8px",
      justifyContent: "center",
      padding: "6px 8px",
      "&.active": {
        "&::after": {
          transform: isActive ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "bottom left",
        },
      },
      "&:hover": {
        backgroundColor: "transparent",
        "&::after": {
          transform: "scaleX(1)",
          transformOrigin: "bottom left",
        },
      },
      "&::after": {
        content: '""',
        position: "absolute",
        height: "2px",
        width: "100%",
        left: 0,
        bottom: "-10px",
        backgroundColor: "#a0f2c4",
        transition: "transform 0.25s ease-out",
        transform: "scaleX(0)",
      },
    },
    menuItemText: {
      "> span": {
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: "600",
        lineHeight: "16px",
      },
      flex: "none",
      margin: "0",
      textAlign: "center",
      color: isActive ? "#fff" : "#7B9EA6",
    },
  })
);

const AppMenuItem: FC<AppMenuItemProps> = (props) => {
  const { name, link, isActive } = props;

  const { classes } = useStyles({
    isActive: isActive as boolean,
  });
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <AppMenuItemComponent
      className={classes.menuItem}
      link={link}
      onClick={handleClick}
      target={props.target}
    >
      <ListItemText className={classes.menuItemText} primary={name} />
    </AppMenuItemComponent>
  );

  return <>{MenuItemRoot}</>;
};

export default memo(AppMenuItem);
