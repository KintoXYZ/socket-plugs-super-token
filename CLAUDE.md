# Socket-Plugs Development Guide

## Commands
- **Build**: `yarn build` - Compiles contracts and generates TypeScript types
- **Lint**: `yarn lint` - Runs prettier to format code
- **Test**: `forge test` - Runs all tests
- **Single Test**: `forge test --match-contract TestKintoHook --match-test testUpdateLimitParams -vvv` 
- **Compile**: `yarn compile` (hardhat) or `forge build` (foundry)

## Code Style Guidelines
- **Format**: Use Prettier for code formatting (`yarn lint`)
- **Solidity**: Version 0.8.13, max optimizer runs (999999)
- **Imports**: Group imports by source (external libs first, then project imports)
- **Error Handling**: Use custom error types from `contracts/common/Errors.sol`
- **Naming**: PascalCase for contracts/interfaces, camelCase for functions/variables
- **Types**: Use specific types (uint256 vs uint), prefix private/internal vars with underscore
- **Comments**: Add NatSpec comments for all public functions and complex logic

## Testing
Tests are written using Forge/Foundry. Use descriptive test names and follow the test naming convention: `test{FunctionName}{Scenario}`.