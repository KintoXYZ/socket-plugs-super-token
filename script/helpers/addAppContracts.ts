import { Contract, Wallet } from "ethers";
import { ChainSlug } from "@socket.tech/dl-core";
import {
  SBAddresses,
  STAddresses,
  TokenContracts,
  SuperBridgeContracts,
  HookContracts,
} from "../../src";
import { getSignerFromChainSlug } from "../helpers/networks";
import { kintoConfig, LEDGER, TREZOR } from "kinto-utils/dist/utils/constants";
import { addAppContracts } from "kinto-utils/dist/kinto";
import { Tokens } from "../../src/enums";
import { isSuperBridge } from "../constants";

const BATCH_SIZE = 25;

async function addContracts(
  addresses: SBAddresses | STAddresses
): Promise<void> {
  // Only register contracts on Kinto chain
  const chainId = ChainSlug.KINTO;
  const chainIdStr = chainId.toString();

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
    if (!tokenAddresses) continue;

    // Add Controller
    const controller = isSuperBridge()
      ? tokenAddresses[SuperBridgeContracts.Controller]
      : tokenAddresses[SuperBridgeContracts.Vault];
    if (!controller) {
      throw new Error(
        `No Controller contract found for ${token} on Kinto chain`
      );
    }
    console.log("controller:", controller);

    // Add Controller
    contractsToAdd.push(controller);

    // Add KintoHook
    const kintoHook = tokenAddresses[HookContracts.KintoHook];
    if (!kintoHook) {
      throw new Error(
        `No KintoHook contract found for ${token} on Kinto chain`
      );
    }
    contractsToAdd.push(kintoHook);
    console.log("kintoHook:", kintoHook);

    // Add all connectors
    if (tokenAddresses.connectors) {
      for (const siblingChain in tokenAddresses.connectors) {
        const connectors = tokenAddresses.connectors[siblingChain];
        console.log("connectors:", connectors);
        if (connectors) {
          for (const integrationType in connectors) {
            if (connectors[integrationType]) {
              contractsToAdd.push(connectors[integrationType]);
            }
          }
        }
      }
    }
  }

  console.log("contractsToAdd:", contractsToAdd);

  if (contractsToAdd.length === 0) {
    throw new Error(`No contracts to register on Kinto chain`);
    return;
  }

  try {
    // Split contracts into batches of BATCH_SIZE
    for (let i = 0; i < contractsToAdd.length; i += BATCH_SIZE) {
      const batch = contractsToAdd.slice(i, i + BATCH_SIZE);
      console.log(
        `Processing batch ${i / BATCH_SIZE + 1} with ${batch.length} contracts`
      );

      // Register batch of contracts with the app registry
      await addAppContracts(
        kintoWalletAddr,
        kintoConfig[chainIdStr].contracts.socketDL.address,
        batch,
        privateKeys,
        chainIdStr
      );

      console.log(`Successfully registered batch ${i / BATCH_SIZE + 1}`);
    }

    console.log("Successfully registered all contract batches");
  } catch (error) {
    console.error(`Error registering contracts:`, error);
    throw error;
  }
}

export { addContracts };
