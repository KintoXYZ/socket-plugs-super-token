pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "solmate/tokens/ERC20.sol";
import "../mocks/MintableToken.sol";
// import "../../contracts/supertoken/SuperToken.sol";
import "../mocks/MockSocket.sol";
import "../../contracts/hooks/KintoHook.sol";
import "forge-std/console.sol";
import "../../contracts/hooks/plugins/ExecutionHelper.sol";

interface KintoID {
    function addSanction(address, uint16) external;
    function hasRole(bytes32, address) external view returns (bool);
    function balanceOf(address) external view returns (uint256);
}

interface KintoWallet {
    function setFunderWhitelist(address[] calldata, bool[] calldata) external;
}

contract TestKintoHook is Test {
    uint256 _c = 1000;
    address immutable _admin = address(uint160(_c++));
    address immutable _raju = address(uint160(_c++));
    address immutable _connector = address(uint160(_c++));
    address immutable _connector1 = address(uint160(_c++));
    address immutable _connector2 = address(uint160(_c++));
    address immutable _otherConnector = address(uint160(_c++));
    bytes32 immutable _messageId = bytes32(_c++);

    uint256 constant _burnMaxLimit = 200 ether;
    uint256 constant _burnRate = 2 ether;
    uint256 constant _mintMaxLimit = 100 ether;
    uint256 constant _mintRate = 1 ether;
    uint256 constant _fees = 0.001 ether;
    uint256 constant _msgGasLimit = 200_000;
    uint256 constant _bootstrapTime = 100;
    uint256 constant _initialSupply = 100000;
    uint256 constant _rajuInitialBal = 1000;
    mapping(address => bytes) connectorCache;
    MintableToken _token;
    KintoHook kintoHook__;
    address _socket;
    address controller__;
    address bridgerL2;
    address kintoWallet__;
    address kintoWalletSigner__; // 1st signer of the kinto wallet
    address kycProvider__;
    uint32 _siblingSlug;
    uint32 _siblingSlug1;
    uint32 _siblingSlug2;
    uint32 _otherSiblingSlug;
    ExecutionHelper _executionHelper;

    bytes32 constant LIMIT_UPDATER_ROLE = keccak256("LIMIT_UPDATER_ROLE");

    function setUp() external {
        uint256 kintoFork = vm.createSelectFork("kinto");

        vm.startPrank(_admin);

        _socket = address(uint160(_c++));
        controller__ = address(uint160(_c++));
        bridgerL2 = 0xf369f78E3A0492CC4e96a90dae0728A38498e9c7;
        kintoWallet__ = 0x2e2B1c42E38f5af81771e65D87729E57ABD1337a;
        kintoWalletSigner__ = 0x660ad4B5A74130a4796B4d54BC6750Ae93C86e6c;
        kycProvider__ = 0x6E31039abF8d248aBed57E307C9E1b7530c269E4;
        _siblingSlug1 = uint32(_c++);
        _siblingSlug2 = uint32(_c++);

        kintoHook__ = new KintoHook(_admin, controller__, false, bridgerL2);
        _token = new MintableToken("Moon", "MOON", 18);
        _token.mint(_admin, _initialSupply);
        _token.mint(_raju, _rajuInitialBal);

        vm.stopPrank();
    }

    function _setLimits() internal {
        UpdateLimitParams[] memory u = new UpdateLimitParams[](4);
        u[0] = UpdateLimitParams(true, _connector1, _mintMaxLimit, _mintRate);
        u[1] = UpdateLimitParams(false, _connector1, _burnMaxLimit, _burnRate);

        u[2] = UpdateLimitParams(true, _connector2, _mintMaxLimit, _mintRate);
        u[3] = UpdateLimitParams(false, _connector2, _burnMaxLimit, _burnRate);

        vm.prank(_admin);
        kintoHook__.grantRole(LIMIT_UPDATER_ROLE, _admin);

        vm.prank(_admin);
        kintoHook__.updateLimitParams(u);
        skip(_bootstrapTime);
    }

    function testUpdateLimitParams() external {
        _setLimits();

        LimitParams memory burnLimitParams = kintoHook__.getSendingLimitParams(
            _connector1
        );
        LimitParams memory mintLimitParams = kintoHook__
            .getReceivingLimitParams(_connector1);

        assertEq(
            burnLimitParams.maxLimit,
            _burnMaxLimit,
            "burn max limit not updated"
        );
        assertEq(
            burnLimitParams.ratePerSecond,
            _burnRate,
            "burn rate not updated"
        );

        assertEq(
            mintLimitParams.maxLimit,
            _mintMaxLimit,
            "mint max limit not updated"
        );
        assertEq(
            mintLimitParams.ratePerSecond,
            _mintRate,
            "mint rate not updated"
        );
    }

    function testUpdateLimitParamsRaju() external {
        UpdateLimitParams[] memory u = new UpdateLimitParams[](2);
        u[0] = UpdateLimitParams(true, _connector1, _mintMaxLimit, _mintRate);
        u[1] = UpdateLimitParams(false, _connector1, _burnMaxLimit, _burnRate);

        vm.prank(_raju);
        vm.expectRevert(
            abi.encodeWithSelector(
                AccessControl.NoPermit.selector,
                LIMIT_UPDATER_ROLE
            )
        );
        kintoHook__.updateLimitParams(u);
    }
}
