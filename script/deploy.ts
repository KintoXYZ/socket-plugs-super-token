import { ChainSlug } from "@socket.tech/dl-core";
import { configure } from "./deploy/configure";
import { deploy } from "./deploy/deploy";
import {
  addContracts,
  updateAppKey,
  updateSponsoredContracts,
} from "./helpers";
import { kintoConfig } from "kinto-utils/dist/utils/constants";

export const main = async () => {
  const config = kintoConfig[ChainSlug.KINTO];
  try {
    let allAddresses = await deploy();
    await addContracts(allAddresses);
    await updateAppKey(config.contracts.socketDL.address, true);
    await updateSponsoredContracts(allAddresses);
    await configure(allAddresses);
    await updateAppKey(config.contracts.socketDL.address, false);
  } catch (error) {
    console.log("Error in deploy and configure: ", error);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
