import { BigNumber, Contract, Wallet, utils } from "ethers";

import { ChainSlug, IntegrationTypes } from "@socket.tech/dl-core";
import { getSignerFromChainSlug } from "./networks";
import { getInstance } from "./deployUtils";
import {
  AppChainAddresses,
  ConnectorAddresses,
  Connectors,
  HookContracts,
  NonAppChainAddresses,
  ProjectType,
  SBTokenAddresses,
  STControllerChainAddresses,
  STTokenAddresses,
  STVaultChainAddresses,
  SuperBridgeContracts,
  UpdateLimitParams,
} from "../../src";
import { execute, getPoolIdHex } from "./utils";
import {
  getProjectType,
  isSuperBridge,
  isSuperToken,
} from "../constants/config";
import {
  getLimitBN,
  getRateBN,
  getTokenConstants,
  isSBAppChain,
  isSTVaultChain,
} from "./projectConstants";
import { Tokens } from "../../src/enums";

const newHooksToOld = {
  '0xed4Ba6c96615aa25888C43968B8c029D18562CE5' : '0x1D1d3B65d4B11292099a7C9f4363aCF75EF8a61f',
  '0x5eB67F062475442F7E0F06EEd3d41490B5363948' : '0x5DB09F649AD72bf3eb5bb60fb41C87D623c30325',
  '0xbA07EAc2Bc1201A397e0f4F3057B986C95e9330e' : '0x018A9B66F39FA24e01dc80458467792AD23BbFc2',
  '0xf0197a84Efb3ba50F8A682E9b643Aa48C51c4A1B' : '0x50D5D49003011FBB14c6c503E40Fc357c56e6dA7',
  '0x72299291aADa296750360a2E27de36c72F5bd8CC' : '0x89d7f72A6B9924c51fFf03EBB49F7e03182f6A96',
  '0x4dC0ed839306f059Fa06665033c244100DbaEcc3' : '0xE024396e6a108d9740C6407eab86730b2E83dc30',
  '0x1f5d94695fD30721b0F852509EDC1a9e0873D63b' : '0xFAcF0fB38a93F839731Fe21d9a70ADe8377eB1b0',
  '0xdcc8c4f8Ba66ec5D534D6557F0E89860E65E713d' : '0xe084914d2728d06cea73eB1530EFDcfF9820635D',
  '0xC9eFC25D82edfFcAB49bCDAcc0A03488DDC83093' : '0x46a8F2f281943752D6b9a4c67C979506D9ad8014',
  '0x94D7C16764f27A872B581a1C53d96790d8a5C3DF' : '0xA187171b2Ed2757F29D160E7FFBCc959C2d9a36e',
  '0xdFd345c506703723FE4e63A7BCF95a33Fed8532d' : '0xc4898CdF33621181Dc605B353881C313f69c7cf6',
  '0x278183e3633D31ddA8fdAa115B0dc7e7459A4112' : '0x36ec6dc8eb4563359D015c1d6518ab714876E890',
  '0x519d36b7f01cD291E37F9776eC4D70c43BF9617f' : '0x23322968FF5eC65770e70E5D5F3C6FABb23f2f55',
  '0x228993DDDeEb0C1dFF8F07E7590c97B3a6bbc5Cd' : '0x2bF336782456649bb38dBF9aEe1021E7244694a4',
  '0x7CB5AB15eF334A355441E38be241bBc1fa6904f2' : '0x008D87C626474556C00f09255dAaCF0b684c5267',
  '0x4021B2350E1A90410003ae798b8eADDBC8815C8A' : '0xdb4F2A06eEaD24e6a87dC50Af9fD9232b473D1ab',
  '0xda1CB440ee610C6893F6e5559e4eCE86b08f331a' : '0x11FcbCa5Ea6dc29E7314B93899601eB2c1B6beD5',
  '0xd55D82Bf956e5EB701A5654aC6272Cb971437Af7' : '0x73A2Eb3DDf82784D951e25C11A4055d71c73104b',
  '0x1fcEE8Ed9359b12754614A5Fd5178C2308CE1e50' : '0xc0b9913B2F831F5871dc1b359DfA593ec5dC2e5D',
  '0xEcb3309fc25dEc12d217EAf4c8581311Cd237F84' : '0xA017A1fd16774A9E79286f7F0bfe1EA27c838604',
  '0x1882A1aaFfB43363870f0fa1c6d477F69A98766F' : '0x35Dc00D1d95267Fe570270489175C5496Cb1dFF6',
  '0x335afE256cd02AF0f2f3dDAed3D0C1FF040f6980' : '0xd779Fac1dE6e6d154808D5F1861300A933afba38',
  '0x600526e92DBBeb5A537B602F72e913a05f248FBa' : '0x04770aEDc3D4f0bDB8A9048c999BAA00735236C3',
  '0x7E5C91C897D031C188005E1Ac11C769168fB4693' : '0xAbFD3cbAC6Bc0a327745A72DAf0598C4169973B0',
  '0x92d159245B8E34416250C8755498b8F149D434CD' : '0x9Fa1fD6b5D7233981637E6e2C7a2281752E68A71',
  '0xffE1044Acc0226121d5B22C1746E4D6516b0572C' : '0x792CAD3D8A1E38a7d942526CBcdA0D0780B8c654',
  '0x5bbC112DD031b4aEc52e8c121516A7F363739294' : '0x83676719f5F3BA775e94b1e54A5E885E7e5e9810',
  '0x929c28F752AF92749489c338EDA28d6Bcf0489d9' : '0xAEa1991291b648F2e947D1662f7bDaecC62E7a32',
  '0x4d9ec2f9115AD7d61f76a0f2C54065bdEe306cF5' : '0xBb5D12aAD6a6480f5dEaF675B16E4974D2B6aaB2',
  '0x3f35Ac66d063164Eb2A50EAE1955045f573857D6' : '0x10b9aF720306f81669D1f9f2b55889Ed69700DD6',
  '0xCd56E410b3C6136FB684855E099Ec11844EA5044' : '0x9984055CA36Dee481bfbfDea3A2f4FafeFaf0d34',
  '0x67D8f56131558cacb7D7932A3E05BaD46F4eAD56' : '0xDB5D76Ee1Db8D088023A35050107d5480A63E08B',
  '0x9E720d22269B740198F89afa5Eb6A48b460A0066' : '0x91FC92FacdEF172BAceB921e962b6F7dF401C9fB',
  '0xfB907C16F3e2D64c1726FBAbD51E86f9D8D0930B' : '0x72AB4beB9ACF20A0e0d79dCA903906beb1053D31',
  '0xCd1c7571fE7D65cF5B08EED69A3616980e886912' : '0x7Af521F6802F992966f622Ff6Ae593bA29094091',
  '0x4cBD43b17a249bBceCB5036f642A64Ef7135B8cf' : '0x39CEE8904dA1a5a9F4039Fe493ba99DF29c42a04',
  '0x864a0d0E81b9Ece73379AD42dd948646E961A532' : '0x6EB6B8Dc3e55e6870F341B42b9f8365F4f2D7EEf',
  '0xcB8fCa76c80330f75cB438Ef19A5a23736FBede7' : '0x043a3E82C1705C60cb4b3689b78e729a7376Ce8B',
  '0x6Ca242A6d96Fa9Ee4781633f98CD43f2B1C30D9C' : '0x4EBf3A584299A4c866F9Caefc36767f772AA6cd1'
}

export const updateConnectorStatus = async (
  chain: ChainSlug,
  siblingSlugs: ChainSlug[],
  connectors: Connectors,
  bridgeContract: Contract,
  newConnectorStatus: boolean
) => {
  const connectorAddresses: string[] = [];

  for (let sibling of siblingSlugs) {
    const siblingConnectorAddresses: ConnectorAddresses | undefined =
      connectors[sibling];
    if (!siblingConnectorAddresses) continue;

    const integrationTypes: IntegrationTypes[] = Object.keys(
      siblingConnectorAddresses
    ) as unknown as IntegrationTypes[];
    for (let it of integrationTypes) {
      const itConnectorAddress: string | undefined =
        siblingConnectorAddresses[it];
      if (!itConnectorAddress) continue;

      let currentConnectorStatus =
        await bridgeContract.callStatic.validConnectors(itConnectorAddress);
      if (currentConnectorStatus !== newConnectorStatus) {
        connectorAddresses.push(itConnectorAddress);
      }
    }
  }
  if (connectorAddresses.length) {
    await execute(
      bridgeContract,
      "updateConnectorStatus",
      [
        connectorAddresses,
        new Array(connectorAddresses.length).fill(newConnectorStatus),
      ],
      chain
    );
  } else {
    console.log(`✔   Connector status already set for chain ${chain}`);
  }
};

export const getBridgeContract = async (
  chain: ChainSlug,
  token: Tokens,
  addr: SBTokenAddresses | STTokenAddresses,
  wallet: Wallet | undefined = undefined
) => {
  const signer = wallet ? wallet : getSignerFromChainSlug(chain);
  let bridgeContract: Contract,
    bridgeAddress: string = "",
    bridgeContractName: string = "";
  if (isSuperBridge()) {
    if (isSBAppChain(chain, token)) {
      const a = addr as AppChainAddresses;
      bridgeAddress = a.Controller;
      bridgeContractName = SuperBridgeContracts.Controller;
    } else {
      const a = addr as NonAppChainAddresses;
      bridgeAddress = a.Vault;
      bridgeContractName = SuperBridgeContracts.Vault;
    }
  }
  if (isSuperToken()) {
    if (isSTVaultChain(chain, token)) {
      const a = addr as STVaultChainAddresses;
      bridgeAddress = a.Vault;
      bridgeContractName = SuperBridgeContracts.Vault;
    } else {
      const a = addr as STControllerChainAddresses;
      bridgeAddress = a.Controller;
      bridgeContractName = SuperBridgeContracts.Controller;
    }
  }

  if (!bridgeAddress) {
    throw new Error("Bridge address not found");
  }

  bridgeContract = await getInstance(bridgeContractName, bridgeAddress);

  bridgeContract = bridgeContract.connect(signer);
  return bridgeContract;
};

export const getTokenContract = async (
  chain: ChainSlug,
  token: Tokens,
  addr: SBTokenAddresses | STTokenAddresses,
  wallet: Wallet | undefined = undefined
) => {
  const signer = wallet ? wallet : getSignerFromChainSlug(chain);
  let tokenContract: Contract,
    tokenAddress: string = "",
    tokenContractName: string = "lib/solmate/src/tokens/ERC20.sol:ERC20";
  if (isSuperBridge()) {
    if (isSBAppChain(chain, token)) {
      const a = addr as AppChainAddresses;
      tokenAddress = a.MintableToken;
    } else {
      const a = addr as NonAppChainAddresses;
      tokenAddress = a.NonMintableToken;
    }
  }
  if (isSuperToken()) {
    if (isSTVaultChain(chain, token)) {
      const a = addr as STVaultChainAddresses;
      tokenAddress = a.NonMintableToken;
    } else {
      const a = addr as STControllerChainAddresses;
      tokenAddress = a.SuperToken;
    }
  }

  if (!tokenAddress) {
    throw new Error("Token address not found");
  }

  tokenContract = await getInstance(tokenContractName, tokenAddress);

  tokenContract = tokenContract.connect(signer);
  return tokenContract;
};

export const getHookContract = async (
  chain: ChainSlug,
  token: Tokens,
  addr: SBTokenAddresses | STTokenAddresses
) => {
  const socketSigner = getSignerFromChainSlug(chain);

  let contract: Contract,
    address: string = "",
    contractName: string = "";

  if (addr[HookContracts.LimitHook]) {
    address = addr[HookContracts.LimitHook];
    contractName = HookContracts.LimitHook;
  }
  if (addr[HookContracts.LimitExecutionHook]) {
    address = addr[HookContracts.LimitExecutionHook];
    contractName = HookContracts.LimitExecutionHook;
  }
  if (addr[HookContracts.KintoHook]) {
    address = addr[HookContracts.KintoHook];
    contractName = HookContracts.KintoHook;
  }
  if (addr[HookContracts.SenderHook]) {
    address = addr[HookContracts.SenderHook];
    contractName = HookContracts.SenderHook;
  }

  if (!address || !contractName) {
    return { hookContract: contract, hookContractName: contractName };
  }

  contract = await getInstance(contractName, address);

  contract = contract.connect(socketSigner);
  return { hookContract: contract, hookContractName: contractName };
};

export const getSiblings = (
  chain: ChainSlug,
  token: Tokens,
  allChains: ChainSlug[]
): ChainSlug[] => {
  let siblings: ChainSlug[] = [];
  let pc = getTokenConstants(token);
  if (getProjectType() == ProjectType.SUPERBRIDGE) {
    siblings = isSBAppChain(chain, token)
      ? pc[token].vaultChains
      : [pc[token].controllerChains[0]];
  } else if (getProjectType() == ProjectType.SUPERTOKEN)
    siblings = allChains.filter((c) => c !== chain);

  return siblings;
};

export const checkAndGrantRole = async (
  chain: ChainSlug,
  contract: Contract,
  roleName: string = "",
  roleHash: string = "",
  userAddress: string
) => {
  let hasRole = await contract.hasRole(roleHash, userAddress);
  if (!hasRole) {
    console.log(
      `-   Adding ${roleName} role to`,
      userAddress,
      "for contract:",
      contract.address,
      "on chain: ",
      chain
    );
    await execute(contract, "grantRole", [roleHash, userAddress], chain);
  } else {
    console.log(
      `✔   ${roleName} role already set on ${contract.address} for ${userAddress} on chain `,
      chain
    );
  }
};

export const checkAndRevokeRole = async (
  chain: ChainSlug,
  contract: Contract,
  roleName: string = "",
  roleHash: string = "",
  userAddress: string
) => {
  let hasRole = await contract.hasRole(roleHash, userAddress);
  if (hasRole) {
    console.log(
      `-   Revoking ${roleName} role to`,
      userAddress,
      "for contract:",
      contract.address,
      "on chain: ",
      chain
    );
    await execute(contract, "revokeRole", [roleHash, userAddress], chain);
  } else {
    console.log(
      `✔   ${roleName} role already revoked on ${contract.address} for ${userAddress} on chain `,
      chain
    );
  }
};

export const updateLimitsAndPoolId = async (
  chain: ChainSlug,
  token: Tokens,
  siblingSlugs: ChainSlug[],
  addr: SBTokenAddresses | STTokenAddresses,
  connectors: Connectors,
  hookContract: Contract
) => {
  const updateLimitParams: UpdateLimitParams[] = [];
  const connectorAddresses: string[] = [];
  const connectorPoolIds: string[] = [];

  for (let sibling of siblingSlugs) {
    const siblingConnectorAddresses: ConnectorAddresses | undefined =
      connectors[sibling];
    if (!siblingConnectorAddresses) continue;

    const integrationTypes: IntegrationTypes[] = Object.keys(
      siblingConnectorAddresses
    ) as unknown as IntegrationTypes[];
    for (let it of integrationTypes) {
      const itConnectorAddress: string | undefined =
        siblingConnectorAddresses[it];
      if (!itConnectorAddress) continue;
      // console.log({ itConnectorAddress });
      let sendingParams = await hookContract.getSendingLimitParams(
        itConnectorAddress
      );
      // console.log({ sendingParams });

      let receivingParams = await hookContract.getReceivingLimitParams(
        itConnectorAddress
      );
      // console.log({ receivingParams })

      // mint/lock/deposit limits
      const sendingLimit = getLimitBN(it, chain, token, true);
      const sendingRate = getRateBN(it, chain, token, true);
      if (
        !sendingLimit.eq(sendingParams["maxLimit"]) ||
        !sendingRate.eq(sendingParams["ratePerSecond"])
      ) {
        updateLimitParams.push([
          false,
          itConnectorAddress,
          sendingLimit,
          sendingRate,
        ]);
      } else {
        console.log(
          `✔   Sending limit already set for chain ${chain}, sibling ${sibling}, integration ${it}`
        );
      }

      const receivingLimit = getLimitBN(it, chain, token, false);
      const receivingRate = getRateBN(it, chain, token, false);

      if (
        !receivingLimit.eq(receivingParams["maxLimit"]) ||
        !receivingRate.eq(receivingParams["ratePerSecond"])
      ) {
        updateLimitParams.push([
          true,
          itConnectorAddress,
          receivingLimit,
          receivingRate,
        ]);
      } else {
        console.log(
          `✔   Receiving limit already set for chain ${chain}, sibling ${sibling}, integration ${it}`
        );
      }

      if (
        isSuperBridge() &&
        isSBAppChain(chain, token)
        // chain !== ChainSlug.AEVO &&
        // chain !== ChainSlug.AEVO_TESTNET
      ) {
        const poolId: BigNumber = await hookContract.connectorPoolIds(
          itConnectorAddress
        );
        // console.log({ itConnectorAddress, poolId });
        const poolIdHex =
          "0x" + BigInt(poolId.toString()).toString(16).padStart(64, "0");

        if (poolIdHex !== getPoolIdHex(sibling, token, it)) {
          connectorAddresses.push(itConnectorAddress);
          connectorPoolIds.push(getPoolIdHex(sibling, token, it));
        } else {
          console.log(
            `✔   Pool id already set for chain ${chain}, sibling ${sibling}, integration ${it}`
          );
        }
      }
    }
  }

  if (updateLimitParams.length) {
    await execute(
      hookContract,
      "updateLimitParams",
      [updateLimitParams],
      chain
    );
  }
  if (isSuperToken()) return;
  let addresses = addr as SBTokenAddresses;
  if (
    addresses.isAppChain &&
    connectorAddresses.length &&
    connectorPoolIds.length
  ) {
    await execute(
      hookContract,
      "updateConnectorPoolId",
      [connectorAddresses, connectorPoolIds],
      chain
    );
  }
  if (
    addresses.isAppChain
  ) {
    for (let sibling of siblingSlugs) {
      const siblingConnectorAddresses: ConnectorAddresses | undefined =
        connectors[sibling];
      if (!siblingConnectorAddresses) continue;

      const integrationTypes: IntegrationTypes[] = Object.keys(
        siblingConnectorAddresses
      ) as unknown as IntegrationTypes[];
      for (let it of integrationTypes) {
        const itConnectorAddress: string | undefined =
          siblingConnectorAddresses[it];
        if (!itConnectorAddress) continue;
          connectorAddresses.push(itConnectorAddress);
        const connectorpolId = await hookContract.connectorPoolIds(itConnectorAddress);
        connectorPoolIds.push(connectorpolId);
      }
    }
    console.log('addresses:', addresses)
    console.log('connectorAddresses:', connectorAddresses)
    console.log('connectorPoolIds:', connectorPoolIds)

    const socketSigner = getSignerFromChainSlug(chain);
    const oldHook = (await getInstance(HookContracts.KintoHook, newHooksToOld[hookContract.address])).connect(socketSigner);
    console.log('hookContract.address:', hookContract.address)
    console.log('oldHook.address:', oldHook.address)
    let amounts = [];
    for (let index = 0; index < connectorPoolIds.length; index++) {
      const newAmount = await hookContract.poolLockedAmounts(connectorPoolIds[index]);
      console.log('newAmount:', newAmount)
      const oldAmount = await oldHook.poolLockedAmounts(connectorPoolIds[index]);
      console.log('oldAmount:', oldAmount)
      amounts.push(newAmount.add(oldAmount));
    }
    console.log('amounts:', amounts)
    console.log('connectorPoolIds:', connectorPoolIds)
    await execute(
      hookContract,
      "updatePoolLockedAmounts",
      [connectorPoolIds, amounts],
      chain
    );
  }
};
