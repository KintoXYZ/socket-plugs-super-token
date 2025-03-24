import { ChainSlug } from "@socket.tech/dl-core";
import { Project, Tokens } from "./enums";

export const ChainSlugToProject: { [chainSlug in ChainSlug]?: Project } = {
  [ChainSlug.KINTO]: Project.KINTO,
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const BRIDGER_L2_ADDRESS = "0x26181Dfc530d96523350e895180b09BAf3d816a0";
