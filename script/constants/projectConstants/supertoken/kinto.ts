import {
    ChainSlug,
    DeploymentMode,
    IntegrationTypes,
} from "@socket.tech/dl-core";
import { Hooks, ProjectConstants } from "../../../../src";
import { Tokens } from "../../../../src/enums";
import { getOwner } from "../../config";

export const pc: ProjectConstants = {
    [DeploymentMode.PROD]: {
      [Tokens.KINTO]: {
        vaultChains: [ChainSlug.KINTO],
        controllerChains: [ChainSlug.MAINNET, ChainSlug.ARBITRUM],
        superTokenInfo: {
          name: "Kinto Token",
          symbol: "K",
          decimals: 18,
          initialSupplyOwner: getOwner(),
          owner: getOwner(),
          initialSupply: 10_000_000,
        },
        hook: {
          hookType: Hooks.KINTO_HOOK,
          limitsAndPoolId: {
            [ChainSlug.KINTO]: {
              [IntegrationTypes.fast]: {
                sendingLimit: "500000",
                receivingLimit: "500000",
              }
            },
            [ChainSlug.MAINNET]: {
              [IntegrationTypes.fast]: {
                sendingLimit: "500000",
                receivingLimit: "500000",
              }
            },
            [ChainSlug.ARBITRUM]: {
              [IntegrationTypes.fast]: {
                sendingLimit: "500000",
                receivingLimit: "500000",
              }
            }
          }
        }
      }
  }
};
