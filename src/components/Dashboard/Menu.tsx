import { Fragment, memo, useMemo } from "react";
import { useLocation } from "react-router-dom";

import {
  DISPLAY_FXD,
  DISPLAY_GOVERNANCE,
  DISPLAY_LENDING,
  DISPLAY_VAULTS,
} from "connectors/networks";
import {
  FxdIcon,
  GovernanceIcon,
  LendingIcon,
  VaultIcon,
} from "components/Common/MenuIcons";
import useConnector from "context/connector";
import AppMenuItem from "components/MenuItem/AppMenuItem";
import useSharedContext from "context/shared";
import AppMenuItemMobile from "../MenuItem/AppMenuItemMobile";

export const Menu = memo(() => {
  const location = useLocation();
  const { chainId } = useConnector();
  const { isMobile } = useSharedContext();

  const isDashboardActive = useMemo(
    () => location.pathname.includes("fxd"),
    [location.pathname]
  );
  // const isStableSwapActive = useMemo(
  //   () => location.pathname.includes("/stable-swap"),
  //   [location.pathname]
  // );
  const isDAOActive = useMemo(
    () => location.pathname.includes("/dao"),
    [location.pathname]
  );
  // const isDexActive = useMemo(
  //   () => location.pathname.includes("/swap"),
  //   [location.pathname]
  // );

  const isLendingActive = useMemo(
    () => location.pathname.includes("/lending"),
    [location.pathname]
  );

  const isVaultActive = useMemo(
    () => location.pathname.includes("vaults"),
    [location.pathname]
  );

  // const isChartsActive = useMemo(
  //   () => location.pathname.includes("charts"),
  //   [location.pathname]
  // );

  const appMenuItems = [];

  if (!chainId || DISPLAY_FXD.includes(chainId)) {
    appMenuItems.push({
      name: "Stablecoin",
      link: "/spusd",
      isActive: isDashboardActive,
      Icon: <FxdIcon isactive={isDashboardActive ? "true" : ""} />,
    });
  }

  // if (!chainId || DISPLAY_STABLE_SWAP.includes(chainId)) {
  //   appMenuItems.push({
  //     name: "Stable Swap",
  //     link: "/stable-swap",
  //     isActive: isStableSwapActive,
  //   });
  // }

  if (!chainId || DISPLAY_LENDING.includes(chainId)) {
    appMenuItems.push({
      name: "Lending",
      link: "/lending",
      isActive: isLendingActive,
      Icon: <LendingIcon isactive={isLendingActive ? "true" : ""} />,
    });
  }

  if (!chainId || DISPLAY_VAULTS.includes(chainId)) {
    appMenuItems.push({
      name: "Vaults",
      link: "/vaults",
      isActive: isVaultActive,
      Icon: <VaultIcon isactive={isVaultActive ? "true" : ""} />,
    });
  }

  // if (!chainId || DISPLAY_DEX.includes(chainId)) {
  //   appMenuItems.push({
  //     name: "DEX",
  //     link: "/swap",
  //     isActive: isDexActive,
  //   });
  // }

  // if (!chainId || DISPLAY_CHARTS.includes(chainId)) {
  //   appMenuItems.push({
  //     name: "Charts",
  //     link: "/charts",
  //     isActive: isChartsActive,
  //   });
  // }

  if (!chainId || DISPLAY_GOVERNANCE.includes(chainId)) {
    appMenuItems.push({
      name: "DAO",
      link: "/dao/staking",
      isActive: isDAOActive,
      Icon: <GovernanceIcon isactive={isDAOActive ? "true" : ""} />,
    });
  }

  // if (!allowStableSwap && (!chainId || DISPLAY_STABLE_SWAP.includes(chainId))) {
  //   appMenuItems.splice(1, 1);
  // }

  return (
    <>
      {appMenuItems.map((item) => (
        <Fragment key={item.name}>
          {isMobile ? (
            <AppMenuItemMobile {...item} />
          ) : (
            <AppMenuItem {...item} />
          )}
        </Fragment>
      ))}
    </>
  );
});
