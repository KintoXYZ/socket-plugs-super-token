import { ChainSlug } from "@socket.tech/dl-core";
import { SBAddresses, STAddresses } from "../../src";
import { kintoConfig } from "@kinto-utils/dist/utils/constants";
import { whitelistAppAndSetKey } from "@kinto-utils/dist/kinto";
import { LEDGER, TREZOR } from "@kinto-utils/dist/utils/constants";

async function setAppKey(app: string, flag: boolean): Promise<void> {
  // Only whitelist on Kinto chain
  const chainId = ChainSlug.KINTO;
  const chainIdStr = chainId.toString();
  const config = kintoConfig[chainIdStr];

  // Get KintoWallet info
  const kintoWalletAddr = process.env.KINTO_OWNER_ADDRESS;
  if (!kintoWalletAddr) {
    throw new Error("KINTO_OWNER_ADDRESS not found in env");
  }

  // Get private keys for signing
  const ownerPrivateKey = process.env.OWNER_SIGNER_KEY;
  if (!ownerPrivateKey) {
    throw new Error("OWNER_SIGNER_KEY not found in env");
  }
  const privateKeys = [`0x${ownerPrivateKey}`, process.env.HARDWARE_WALLET === "TREZOR" ? TREZOR : LEDGER];

  console.log(`\nWhitelisting SocketDL app on Kinto chain...`);
  console.log(`SocketDL address: ${config.contracts.socketDL.address}`);

  try {
    await whitelistAppAndSetKey(
      kintoWalletAddr,
      app,
      privateKeys,
      chainIdStr
    );
  } catch (error) {
    console.error(`Error whitelisting SocketDL app:`, error);
    throw error;
  }
}

export { setAppKey };
