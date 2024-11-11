import { ChainSlug } from "@socket.tech/dl-core";
import { kintoConfig } from "kinto-utils/dist/utils/constants";
import { setSponsoredContracts } from "kinto-utils/dist/kinto";
import { ZERO_ADDRESS } from "../../src/constants";
import { LEDGER, TREZOR } from "kinto-utils/dist/utils/constants";
import { computeAddress } from "ethers/lib/utils";
import {
  SBAddresses,
  STAddresses,
  TokenContracts,
  SuperBridgeContracts,
  HookContracts,
} from "../../src";

async function updateSponsoredContracts(addresses: SBAddresses | STAddresses): Promise<void> {
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

  // Get deployed contracts on Kinto chain
  const kintoAddresses = addresses[chainId];
  if (!kintoAddresses) {
    throw new Error("No contracts deployed on Kinto chain");
  }

  // Collect all contract addresses that need to be registered
  const contractsToAdd: string[] = [];

  for (const token in kintoAddresses) {
    const tokenAddresses = kintoAddresses[token];

    // AddMintableToken 
    const mintableToken = tokenAddresses[SuperBridgeContracts.MintableToken];
    if (!mintableToken) {
      throw new Error(
        `No Controller contract found for ${token} on Kinto chain`
      );
    }
    console.log("MintableToken:", mintableToken);

    // Add Controller
    contractsToAdd.push(mintableToken);

  }

  console.log("contractsToAdd:", contractsToAdd);

  try {
    await setSponsoredContracts(
      kintoWalletAddr,
      kintoConfig[chainIdStr].contracts.socketDL.address,
      contractsToAdd,
      contractsToAdd.map(_ => true),
      privateKeys,
      chainIdStr
    );
  } catch (error) {
    console.error(`Error updateSponsoredContracts:`, error);
    throw error;
  }
}

export { updateSponsoredContracts };
