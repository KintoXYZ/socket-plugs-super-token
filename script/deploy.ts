import { ChainSlug } from "@socket.tech/dl-core";
import { configure } from "./deploy/configure";
import { deploy } from "./deploy/deploy";
import { addAppContracts, setAppKey } from "./helpers";
import { ZERO_ADDRESS } from "../src/constants";
import { kintoConfig } from "@kinto-utils/dist/utils/constants";

export const main = async () => {
  const config = kintoConfig[ChainSlug.KINTO];
  try {
    let allAddresses = await deploy();
    await addAppContracts(allAddresses);
    await setAppKey(config.contracts.socketDL.address, true);
    await configure(allAddresses);
    await setAppKey(ZERO_ADDRESS, true);
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
