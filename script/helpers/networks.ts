import { config as dotenvConfig } from "dotenv";
import { BigNumberish, Wallet, ethers } from "ethers";
import { resolve } from "path";
import { ChainSlug, ChainSlugToKey } from "@socket.tech/dl-core";
import { getOwnerSignerKey } from "../constants/config";
import { chainSlugReverseMap } from "../setup/enumMaps";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

export const chainSlugKeys: string[] = Object.values(ChainSlugToKey);

export const gasLimit = undefined;
export const gasPrice = undefined;
export const type = 2;

export const overrides: {
  [chain in ChainSlug]?: {
    type?: number | undefined;
    gasLimit?: BigNumberish | undefined;
    gasPrice?: BigNumberish | undefined;
  };
} = {
  [ChainSlug.OPTIMISM]: {
    type,
    // gasLimit: 2_000_000,
    gasPrice,
  },
  [ChainSlug.ARBITRUM]: {
    // type,
    // gasLimit: 2_000_000,
    gasPrice,
  },
  [ChainSlug.MAINNET]: {
    // type: 1,
    // gasLimit: 4_000_000,
    // gasPrice: 40_000_000_000,
  },
  [ChainSlug.BSC]: {
    type: 1,
    gasLimit: 5_000_000,
    gasPrice: 5_000_000_000,
  },
  [ChainSlug.BASE]: {
    // type: 1,
    gasLimit,
    gasPrice,
  },
};

export const rpcKeys = (chainSlug: ChainSlug) => {
  const chainName = chainSlugReverseMap.get(String(chainSlug));
  return `${chainName.toUpperCase()}_RPC`;
};

export function getJsonRpcUrl(chain: ChainSlug): string {
  let chainRpcKey = rpcKeys(chain);
  if (!chainRpcKey) throw Error(`Chain ${chain} not found in rpcKey`);
  let rpc = process.env[chainRpcKey];
  if (!rpc) {
    throw new Error(
      `RPC not configured for chain ${chain}. Missing env variable : ${rpcKeys(
        chain
      )}`
    );
  }
  return rpc;
}

export const getProviderFromChainSlug = (
  chainSlug: ChainSlug
): ethers.providers.StaticJsonRpcProvider => {
  const jsonRpcUrl = getJsonRpcUrl(chainSlug);
  return new ethers.providers.StaticJsonRpcProvider(jsonRpcUrl);
};

export const getSignerFromChainSlug = (chainSlug: ChainSlug): Wallet => {
  return new Wallet(getOwnerSignerKey(), getProviderFromChainSlug(chainSlug));
};
