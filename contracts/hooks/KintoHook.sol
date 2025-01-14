// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./LimitHook.sol";

import "forge-std/console2.sol";

interface IKintoID {
    function isKYC(address) external view returns (bool);
}

interface IKintoFactory {
    function walletTs(address) external view returns (uint256);
}

interface IBridgerL2 {
    function srcPreHookCall(SrcPreHookCallParams memory params_) external;
    function dstPreHookCall(DstPreHookCallParams memory params_) external;
}

interface IKintoWallet {
    function isFunderWhitelisted(address) external view returns (bool);
    function owners(uint256) external view returns (address);
}

/**
 * @title Kinto Hook
 * @notice meant to be deployed only Kinto. Inherits from LimitHook.
 */
contract KintoHook is LimitHook {
    IBridgerL2 public immutable bridgerL2;

    /**
     * @notice Constructor for creating a Kinto Hook
     * @param owner_ Owner of this contract.
     * @param controller_ Controller of this contract.
     * @param useControllerPools_ Whether to use controller pools.
     * @param bridgerL2_ BridgerL2 contract address.
     */
    constructor(
        address owner_,
        address controller_,
        bool useControllerPools_,
        address bridgerL2_
    ) LimitHook(owner_, controller_, useControllerPools_) {
        hookType = keccak256("KINTO");
        bridgerL2 = IBridgerL2(bridgerL2_);
    }

    /**
     * @dev called when Kinto user wants to "withdraw" (bridge out). Checks if sender is a KintoWallet,
     * if the wallet's signer is KYC'd and if the receiver of the funds is whitelisted.
     */
    function srcPreHookCall(
        SrcPreHookCallParams memory params_
    )
        public
        override
        isVaultOrController
        returns (TransferInfo memory transferInfo, bytes memory postHookData)
    {
        bridgerL2.srcPreHookCall(params_);
        return super.srcPreHookCall(params_);
    }

    function srcPostHookCall(
        SrcPostHookCallParams memory params_
    ) public view override isVaultOrController returns (TransferInfo memory) {
        return super.srcPostHookCall(params_);
    }

    /**
     * @dev called when user wants to bridge assets into Kinto. It checks if the receiver
     * is a Kinto Wallet, if the wallet's signer is KYC'd and if the "original sender"
     * (initiator of the tx on the vault chain) is whitelisted on the receiver's KintoWallet.
     *
     * The "original sender" is passed as an encoded param through the SenderHook.
     * If the sender is not in the allowlist (e.g Bridger L1), it checks it's whitelisted on the receiver's KintoWallet.
     */
    function dstPreHookCall(
        DstPreHookCallParams memory params_
    )
        public
        override
        isVaultOrController
        returns (bytes memory postHookData, TransferInfo memory transferInfo)
    {
        bridgerL2.dstPreHookCall(params_);
        return super.dstPreHookCall(params_);
    }

    function dstPostHookCall(
        DstPostHookCallParams memory params_
    ) public override isVaultOrController returns (CacheData memory cacheData) {
        return super.dstPostHookCall(params_);
    }
}
