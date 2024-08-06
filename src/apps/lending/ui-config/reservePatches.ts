import { CustomMarket } from "apps/lending/ui-config/marketsConfig";

export interface IconSymbolInterface {
  underlyingAsset: string;
  symbol: string;
  name: string;
}

interface IconMapInterface {
  iconSymbol: string;
  name?: string;
  symbol?: string;
}

export function fetchIconSymbolAndName({
  symbol,
  name,
  underlyingAsset,
}: IconSymbolInterface) {
  const currentMarket = localStorage.getItem("selectedMarket");
  const underlyingAssetMap: Record<string, IconMapInterface> =
    currentMarket === CustomMarket.proto_apothem_v3 ||
    currentMarket === CustomMarket.proto_mainnet_v3
      ? {
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
            name: "SOLANA",
            symbol: "SOL",
            iconSymbol: "SOL",
          },
        }
      : {
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": {
            name: "SepoliaETH",
            symbol: "ETH",
            iconSymbol: "ETH",
          },
        };

  const lowerUnderlyingAsset = underlyingAsset.toLowerCase();
  if (lowerUnderlyingAsset in underlyingAssetMap) {
    return {
      symbol,
      ...underlyingAssetMap[lowerUnderlyingAsset],
    };
  }

  if (symbol === "CGO") {
    return {
      iconSymbol: "VNXAU",
      name: "VNX Gold",
      symbol: "VNXAU",
    };
  } else if (symbol === "EURS") {
    return {
      iconSymbol: "EURC",
      name: "EURC",
      symbol: "EURC",
    };
  } else if (symbol === "USDTx") {
    return {
      iconSymbol: "USDC",
      name: "USDC",
      symbol: "USDC",
    };
  } else if (symbol === "WXDC") {
    return {
      iconSymbol: "SOL",
      name: "Wrapped SOLANA",
      symbol: "WSOL",
    };
  } else if (symbol === "FXD") {
    return {
      iconSymbol: "FXD",
      name: "Splyce USD",
      symbol: "spUSD",
    };
  } else if (symbol === "FTHM") {
    return {
      iconSymbol: "FTHM",
      name: "Splyce Protocol Token",
      symbol: "SPLY",
    };
  }

  return {
    iconSymbol: symbol,
    name,
    symbol,
  };
}
