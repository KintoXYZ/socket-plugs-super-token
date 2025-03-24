import { ChainSlug } from "@socket.tech/dl-core";
import { Tokens } from "./tokens";

export const ExistingTokenAddresses: {
  [key in ChainSlug]?: { [key in Tokens]?: string };
} = {
  [ChainSlug.MAINNET]: {
    [Tokens.KINTO]: "0x0107006da856F5225ee585a2316a0339209F4439",
  },
  [ChainSlug.ARBITRUM]: {
    [Tokens.KINTO]: "0x010700AB046Dd8e92b0e3587842080Df36364ed3",
  },
  [ChainSlug.BASE]: {
    
  },
  [ChainSlug.KINTO]: {
    
  },
};
