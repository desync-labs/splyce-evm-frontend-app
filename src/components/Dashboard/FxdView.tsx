import { Outlet, useLocation } from "react-router-dom";
import { FC, useMemo } from "react";
import { styled } from "@mui/material/styles";
import { DashboardIcon, TransactionsIcon } from "components/Common/MenuIcons";
import {
  NestedRouteLink,
  NestedRouteNav,
} from "components/AppComponents/AppBox/AppBox";

const FXDNestedRouteContainer = styled("div")`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const FXDView: FC = () => {
  const location = useLocation();

  const isFXDActive = useMemo(
    () => ["/spusd"].includes(location.pathname),
    [location.pathname]
  );

  const isTransactionsActive = useMemo(() => {
    return location.pathname.includes("/spusd/transactions");
  }, [location.pathname]);

  return (
    <>
      {process.env.REACT_APP_FXD_TRANSACTIONS_ENABLED === "true" &&
        localStorage.getItem("isConnected") && (
          <NestedRouteNav>
            <NestedRouteLink
              className={isFXDActive ? "active" : ""}
              to="/spusd"
            >
              <DashboardIcon isactive={isFXDActive ? "true" : ""} />
              Overview
            </NestedRouteLink>
            <NestedRouteLink
              className={isTransactionsActive ? "active" : ""}
              to="/spusd/transactions"
            >
              <TransactionsIcon
                isactive={isTransactionsActive ? "active" : ""}
              />
              Transactions
            </NestedRouteLink>
          </NestedRouteNav>
        )}
      <FXDNestedRouteContainer>
        <Outlet />
      </FXDNestedRouteContainer>
    </>
  );
};

export default FXDView;
