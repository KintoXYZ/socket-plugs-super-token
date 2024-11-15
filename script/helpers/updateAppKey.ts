import { ChainSlug } from "@socket.tech/dl-core";
import { SBAddresses, STAddresses } from "../../src";
import { kintoConfig } from "kinto-utils/dist/utils/constants";
import { whitelistAppAndSetKey, setAppKey } from "kinto-utils/dist/kinto";
import { ZERO_ADDRESS } from "../../src/constants";
import { LEDGER, TREZOR } from "kinto-utils/dist/utils/constants";
import { computeAddress } from "ethers/lib/utils";

async function updateAppKey(app: string, flag: boolean): Promise<void> {
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
  const privateKeys = [
    `0x${ownerPrivateKey}`,
    process.env.HARDWARE_WALLET === "TREZOR" ? TREZOR : LEDGER,
  ];

  console.log(`\nSetting app key for SocketDL app on Kinto chain to ${flag}`);
  console.log(`SocketDL address: ${config.contracts.socketDL.address}`);

  try {
    await setAppKey(
      kintoWalletAddr,
      app,
      flag ? computeAddress(privateKeys[0]) : ZERO_ADDRESS,
      privateKeys,
      chainIdStr
    );
  } catch (error) {
    console.error(`Error whitelisting SocketDL app:`, error);
    throw error;
  }
}

export { updateAppKey };
