import { ChainSlug } from "@socket.tech/dl-core";
import { Tokens } from "./tokens";

export const ExistingTokenAddresses: {
  [key in ChainSlug]?: { [key in Tokens]?: string };
} = {
  [ChainSlug.MAINNET]: {},
  [ChainSlug.ARBITRUM]: {
    [Tokens.KINTO]: "0x6bA19Ee69D5DDe3aB70185C801fA404F66feDB58",
  },
  [ChainSlug.BASE]: {},
  [ChainSlug.KINTO]: {
    [Tokens.KINTO]: "0x010700808D59d2bb92257fCafACfe8e5bFF7aB87",
  },
};
