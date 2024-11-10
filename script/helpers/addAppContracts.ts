import { Contract, Wallet } from "ethers";
import { ChainSlug } from "@socket.tech/dl-core";
import {
  SBAddresses,
  STAddresses,
  TokenContracts,
  SuperBridgeContracts,
} from "../../src";
import { getSignerFromChainSlug } from "../helpers/networks";
import { kintoConfig, LEDGER, TREZOR } from "@kinto-utils/dist/utils/constants";
import { registerAppContracts } from "@kinto-utils/dist/kinto";
import { Tokens } from "../../src/enums";

async function addAppContracts(addresses: SBAddresses | STAddresses): Promise<void> {
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
  const privateKeys = [`0x${ownerPrivateKey}`, process.env.HARDWARE_WALLET === "TREZOR" ? TREZOR : LEDGER];

  // Get deployed contracts on Kinto chain
  const kintoAddresses = addresses[chainId];
  if (!kintoAddresses) {
    console.log("No contracts deployed on Kinto chain");
    return;
  }

  // Collect all contract addresses that need to be registered
  const contractsToAdd: string[] = [];

  for (const token in kintoAddresses) {
    const tokenAddresses = kintoAddresses[token];
    if (!tokenAddresses) continue;

    // The main app contract is the Controller
    const controller = tokenAddresses[SuperBridgeContracts.Controller];
    if (!controller) {
      console.log(`No Controller contract found for ${token} on Kinto chain`);
      continue;
    }

    // Add Controller
    contractsToAdd.push(controller);

    // Add SuperToken if it exists
    if (tokenAddresses[TokenContracts.SuperToken]) {
      contractsToAdd.push(tokenAddresses[TokenContracts.SuperToken]);
    }

    // Add hook contracts if they exist
    if (tokenAddresses.hooks) {
      for (const hookType in tokenAddresses.hooks) {
        const hookContract = tokenAddresses.hooks[hookType];
        if (hookContract) {
          contractsToAdd.push(hookContract);
        }
      }
    }

    // Add all connectors
    if (tokenAddresses.connectors) {
      for (const siblingChain in tokenAddresses.connectors) {
        const connectors = tokenAddresses.connectors[siblingChain];
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

  if (contractsToAdd.length === 0) {
    console.log(`No contracts to register on Kinto chain`);
    return;
  }

  try {
    // Register all contracts with the app registry using the utility function
    await registerAppContracts(
      kintoWalletAddr,
      kintoConfig[chainIdStr].contracts.socketDL.address,
      contractsToAdd,
      privateKeys,
      chainIdStr
    );
  } catch (error) {
    console.error(`Error registering contracts:`, error);
    throw error;
  }
}

export { addAppContracts };
