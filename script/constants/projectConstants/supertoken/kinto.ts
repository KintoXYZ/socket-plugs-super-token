
import {
    ChainSlug,
    DeploymentMode,
    IntegrationTypes,
} from "@socket.tech/dl-core";
import { Hooks, ProjectConstants } from "../../../../src";
import { Tokens } from "../../../../src/enums";

export const pc: ProjectConstants = {
    [DeploymentMode.PROD]: {
  [ChainSlug.7887]: {
    vaultChains: [ChainSlug.KINTO],
    controllerChains: [ChainSlug.MAINNET, ChainSlug.ARBITRUM],
    hook: {
      hookType: Hooks.KINTO_HOOK,
      limitsAndPoolId: {
        [ChainSlug.MAINNET]: {
          [IntegrationTypes.fast]: {
            sendingLimit: "500000",
            receivingLimit: "500000"
          }
        },
        [ChainSlug.ARBITRUM]: {
          [IntegrationTypes.fast]: {
            sendingLimit: "500000",
            receivingLimit: "500000"
          }
        }
      }
    }
  }
}
};
