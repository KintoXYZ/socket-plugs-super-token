import { ChainSlug } from "@socket.tech/dl-core";
import { Tokens } from "./tokens";

export const ExistingTokenAddresses: {
  [key in ChainSlug]?: { [key in Tokens]?: string };
} = {
  [ChainSlug.MAINNET]: {
      },
  [ChainSlug.ARBITRUM]: {
    
  },
  [ChainSlug.BASE]: {
    
  },
  [ChainSlug.KINTO]: {
    
  },
};
