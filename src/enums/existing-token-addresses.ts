import { ChainSlug } from "@socket.tech/dl-core";
import { Tokens } from "./tokens";

export const ExistingTokenAddresses: {
  [key in ChainSlug]?: { [key in Tokens]?: string };
} = {
  [ChainSlug.MAINNET]: {
    [Tokens.WETH]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    [Tokens.SNX]: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
    [Tokens.ETH]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    [Tokens.USDe]: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
    [Tokens.sUSDe]: "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497",
    [Tokens.wUSDM]: "0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812",
    [Tokens.ENA]: "0x57e114B691Db790C35207b2e685D4A43181e6061",
    [Tokens.eETH]: "0x35fA164735182de50811E8e2E824cFb9B6118ac2",
    [Tokens.EIGEN]: "0xec53bF9167f50cDEB3Ae105f56099aaaB9061F83",
    [Tokens.ETHFI]: "0xFe0c30065B384F05761f15d0CC899D4F9F9Cc0eB",
    [Tokens.KINTO]: "0x2367C8395a283f0285c6E312D5aA15826f1fEA25",
    [Tokens.MKR]: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    [Tokens.PAXG]: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
    [Tokens.XAUT]: "0x68749665FF8D2d112Fa859AA293F07A622782F38",
    [Tokens.eUSD]: "0x939778D83b46B456224A33Fb59630B11DEC56663",
    [Tokens.rsENA]: "0x7e0209ab6fa3c7730603b68799bbe9327dab7e88",
    [Tokens.rsUSDe]: "0x890b6afc834c2a2cc6cb9b6627272ab4ecfd8271",
    [Tokens.SOL]: "0xd31a59c85ae9d8edefec411d448f90841571b89c",
    [Tokens.SPX]: "0xE0f63A424a4439cBE457D80E4f4b51aD25b2c56C",
    [Tokens.AAVE] : '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    [Tokens.aAAVE] : '0xA700b4eB416Be35b2911fd5Dee80678ff64fF6C9',
    [Tokens.aETH] : '0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8',
    [Tokens.WBTC]: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    [Tokens.aWBTC] : '0x5Ee5bf7ae06D1Be5997A1A72006FE6C607eC6DE8',
    [Tokens.weETH]: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
    [Tokens.aweETH] : '0xBdfa7b7893081B35Fb54027489e2Bc7A38275129',
    [Tokens.USDC]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    [Tokens.aUSDC] : '0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c',
    [Tokens.USDT]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    [Tokens.aUSDT] : '0x23878914EFE38d27C4D67Ab83ed1b93A74D4086a',
    [Tokens.DAI]: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    [Tokens.sDAI]: "0x83F20F44975D03b1b09e64809B757c47f942BEeA",
    [Tokens.aDAI] : '0x018008bfb33d285247A21d44E50697654f754e63',
    [Tokens.LINK] : '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    [Tokens.aLINK] : '0x5E8C8A7243651DB1384C0dDfDbE39761E8e7E51a',
    [Tokens.GHO] : '0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f',
    [Tokens.aGHO] : '0x00907f9921424583e7ffBfEdf84F92B7B2Be4977',
    [Tokens.rETH] : '0xae78736Cd615f374D3085123A210448E74Fc6393',
    [Tokens.arETH] : '0xCc9EE9483f662091a1de4795249E24aC0aC2630f',
    [Tokens.cbETH] : '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
    [Tokens.acbETH] : '0x977b6fc5dE62598B08C85AC8Cf2b745874E8b78c',
    [Tokens.cbBTC] : '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    [Tokens.acbBTC] : '0x5c647cE0Ae10658ec44FA4E11A51c96e94efd1Dd',
    [Tokens.WSTETH]: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
    [Tokens.aWSTETH]: "0x0B925eD163218f6662a35e0f0371Ac234f9E9371"
  },
  [ChainSlug.ARBITRUM]: {
    [Tokens.USDCE]: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    [Tokens.WETH]: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    [Tokens.ETH]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    [Tokens.USDe]: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
    [Tokens.wUSDM]: "0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812",
    [Tokens.SolvBTC]: "0x3647c54c4c2c65bc7a2d63c0da2809b399dbbdc0",
    [Tokens.stUSD]: "0x0022228a2cc5E7eF0274A7Baa600d44da5aB5776",
    [Tokens.stEUR]: "0x004626A008B1aCdC4c74ab51644093b155e59A23",
    [Tokens.SOL]: "0xb74da9fe2f96b9e0a5f4a3cf0b92dd2bec617124",
    [Tokens.AAVE] : '0xba5DdD1f9d7F570dc94a51479a000E3BCE967196',
    [Tokens.aAAVE] : '0xf329e36C7bF6E5E86ce2150875a84Ce77f477375',
    [Tokens.aETH] : '0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8',
    [Tokens.WBTC]: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    [Tokens.aWBTC] : '0x078f358208685046a11C85e8ad32895DED33A249',
    [Tokens.weETH]: "0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe",
    [Tokens.aweETH] : '0x8437d7C167dFB82ED4Cb79CD44B7a32A1dd95c77',
    [Tokens.USDC]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    [Tokens.aUSDC] : '0x625E7708f30cA75bfd92586e17077590C60eb4cD',
    [Tokens.USDT]: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    [Tokens.aUSDT] : '0x6ab707Aca953eDAeFBc4fD23bA73294241490620',
    [Tokens.DAI]: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    [Tokens.aDAI] : '0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE',
    [Tokens.LINK] : '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
    [Tokens.aLINK] : '0x191c10Aa4AF7C30e871E70C95dB0E4eb77237530',
    [Tokens.GHO] : '0x7dfF72693f6A4149b17e7C6314655f6A9F7c8B33',
    [Tokens.aGHO] : '0xeBe517846d0F36eCEd99C735cbF6131e1fEB775D',
    [Tokens.rETH] : '0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8',
    [Tokens.arETH] : '0x8Eb270e296023E9D92081fdF967dDd7878724424',
    [Tokens.ARB] : '0x912CE59144191C1204E64559FE8253a0e49E6548',
    [Tokens.aARB] : '0x6533afac2E7BCCB20dca161449A13A32D391fb00',
    [Tokens.WSTETH]: "0x5979D7b546E38E414F7E9822514be443A4800529",
    [Tokens.aWSTETH]: "0x513c7E3a9c69cA3e22550eF58AC1C0088e918FFf"
  },
  [ChainSlug.BASE]: {
    [Tokens.WETH]: "0x4200000000000000000000000000000000000006",
    [Tokens.ETH]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    [Tokens.DAI]: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    [Tokens.SPX]: "0x50dA645f148798F68EF2d7dB7C1CB22A6819bb2C",
    [Tokens.weETH]: "0x04c0599ae5a44757c0af6f9ec3b93da8976c150a",
    [Tokens.aweETH] : '0x7C307e128efA31F540F2E2d976C995E0B65F51F6',
    [Tokens.USDC]: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    [Tokens.aUSDC] : '0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB',
    [Tokens.cbETH] : '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
    [Tokens.acbETH] : '0xcf3D55c10DB69f28fD1A75Bd73f3D8A2d9c595ad',
    [Tokens.cbBTC] : '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    [Tokens.acbBTC] : '0xBdb9300b7CDE636d9cD4AFF00f6F009fFBBc8EE6',
    [Tokens.WSTETH]: "0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452",
    [Tokens.WSTETH]: "0x99CBC45ea5bb7eF3a5BC08FB1B7E56bB2442Ef0D"
  },
  [ChainSlug.OPTIMISM]: {
    [Tokens.USDCE]: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    [Tokens.USDT]: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    [Tokens.WETH]: "0x4200000000000000000000000000000000000006",
    [Tokens.WBTC]: "0x68f180fcce6836688e9084f035309e29bf0a2095",
    [Tokens.SNX]: "0x8700daec35af8ff88c16bdf0418774cb3d7599b4",
    [Tokens.ETH]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    [Tokens.USDC]: "0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757",
    [Tokens.DAI]: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    [Tokens.WSTETH]: "0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb"
  },
  [ChainSlug.KINTO]: {
    [Tokens.WETH]: "0x0E7000967bcB5fC76A5A89082db04ed0Bf9548d8",
    [Tokens.USDe]: "0x05dE0003C333A503bea5224fCc64f0D4b5446C38",
    [Tokens.sUSDe]: "0x505de0f7a5d786063348aB5BC31e3a21344fA7B0",
    [Tokens.WSTETH]: "0x057e70cCa0dC435786a50FcF440bf8FcC1eEAf17",
    [Tokens.wUSDM]: "0x0050110dd97a2bf4fDD8D69530B3e85d2e3EDfbc",
    [Tokens.ENA]: "0xE040001C257237839a69E9683349C173297876F0",
    [Tokens.eETH]: "0xee70005Ec41738eA7ED2B97D7d56ac829F1E99e6",
    [Tokens.EIGEN]: "0xe16E00eeFCd866e8aE5a4e43bBdd6831da6391E1",
    [Tokens.ETHFI]: "0xe70F10CD4bD932a28b80d48D771026a4c88E6285",
    [Tokens.SolvBTC]: "0x501B7c581aEf05b8DD6C4924338fCBE8f930ab46",
    [Tokens.KINTO]: "0x010700808D59d2bb92257fCafACfe8e5bFF7aB87",
    [Tokens.MKR]: "0x11A1e3777010fcbc31Bd1b9B095b2009ca04b1Ed",
    [Tokens.PAXG]: "0x17A060E324A8629fbd096A295cC88EE4939d3646",
    [Tokens.XAUT]: "0x0a070085e529c98036b1779dbA6D3896e10197D1",
    [Tokens.eUSD]: "0xe05d00c92C7F3F760221A79eC912b67a792E1052",
    [Tokens.rsENA]: "0x25E0a03B871D71265fE17A600823ff0fF0076Bd4",
    [Tokens.rsUSDe]: "0x2505De87C816ad0969F6B7f3ee2A39E336f802a2",
    [Tokens.stUSD]: "0x5705d0c6956bCcC6CF91B122EC36Ef0F741659b3",
    [Tokens.stEUR]: "0x57E090cE57D03152fa6dc4b45FA0382c19C2409D",
    [Tokens.SOL]: "0x736F6c64C8e25dB3560db6cdB9CCaa35fCBE8a39",
    [Tokens.SPX]: "0x69006c45c3358359815d4dc55fa314Ab0e70776b",
    [Tokens.AAVE] : '0xaa0e00F095Eb986CB65FD3FA328782c7Fe4ceFD9',
    [Tokens.aAAVE] : '0xaAa0E01e5841a58069D5a68162800Fe92d0d0Ef7',
    [Tokens.aETH] : '0xAE7000DD23bbDc457E52baFe79F939bEb8b97C16',
    [Tokens.WBTC]: "0x0b7c000778b98aE2Bc5AF57906Ef3578C243C159",
    [Tokens.aWBTC] : '0xa0B7C0A9D77d65276756078B3A8B235741f52C8a',
    [Tokens.weETH]: "0x0Ee700095AeDFe0814fFf7d6DFD75461De8e2b19",
    [Tokens.aweETH] : '0xA0Ee7072DCE17316cD38950288b89BE87D738A7A',
    [Tokens.USDC]: "0x05DC0010C9902EcF6CBc921c6A4bd971c69E5A2E",
    [Tokens.aUSDC] : '0xA0Ee7072DCE17316cD38950288b89BE87D738A7A',
    [Tokens.USDT]: "0x06D7002A76545f255657aC27313B28831Aa6BceD",
    [Tokens.aUSDT] : '0xA06D706d5729BC3803Ebc098f0a87100fFE1cEb9',
    [Tokens.DAI]: "0xdA100067134959575D87D11d54F2722Ba3C934aB",
    [Tokens.sDAI]: "0x5da1004F7341D510C6651C67B4EFcEEA76Cac0E8",
    [Tokens.aDAI] : '0xAda100895A17941f9D1580f5436E2ac6Cfb46e98',
    [Tokens.LINK] : '0x1100003a4f372b763d98407adAD1aC310203D2df',
    [Tokens.aLINK] : '0xa110006176603f40C168a04bD6Dc7122096a4285',
    [Tokens.GHO] : '0x6000003a8ED10ef59185ADf65Fc51C72f975be85',
    [Tokens.aGHO] : '0xa600001797c87Aa0Ff12C1C8004e7A825a253588',
    [Tokens.rETH] : '0x9e70005da96A71017572258F4D1BbA67e0bee246',
    [Tokens.arETH] : '0xa9e700dafBAc16040954b4240dfFc816bB5037f0',
    [Tokens.cbETH] : '0xCbe70061Ce17E7469C474AF342e063bAcB33E5c1',
    [Tokens.acbETH] : '0xACBe70bf47fA65D9e9f81cf85bB590f1E7703bc9',
    [Tokens.cbBTC] : '0xCBb7c0F98bb7312b821e78AB76312Cd3950fBFca',
    [Tokens.acbBTC] : '0xAcbB7Cf7492b5C8b67e87ECaF58585d8d1878c08',
    [Tokens.ARB] : '0xA9B000d6479e5Fa53010B0d67c55fff823f61844',
    [Tokens.aARB] : '0xAA9B009394CAE1f9683D00a0b5E29A97EB46D85b'
  },
  [ChainSlug.POLYGON_MAINNET]: {
    [Tokens.USDCE]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    [Tokens.USDT]: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    [Tokens.WETH]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    [Tokens.WBTC]: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    [Tokens.USDC]: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    [Tokens.DAI]: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063"
  },
  [ChainSlug.ARBITRUM_SEPOLIA]: {
    [Tokens.WETH]: "0x565810cbfa3Cf1390963E5aFa2fB953795686339",
    [Tokens.USDC]: "0x8537307810fC40F4073A12a38554D4Ff78EfFf41"
  },
  [ChainSlug.SEPOLIA]: {
    [Tokens.WETH]: "0xE67ABDA0D43f7AC8f37876bBF00D1DFadbB93aaa",
    [Tokens.USDC]: "0x565810cbfa3Cf1390963E5aFa2fB953795686339"
  },
  [ChainSlug.AEVO_TESTNET]: {
    [Tokens.USDC]: "0x4D435C00E09034ec2113F63088CCD0be0a0fd06e"
  },
  [ChainSlug.OPTIMISM_SEPOLIA]: {
    [Tokens.WETH]: "0x2b42AFFD4b7C14d9B7C2579229495c052672Ccd3",
    [Tokens.USDC]: "0x6D290609b3F5F02D52F28d97C75a443ED8564cBf"
  },
};
