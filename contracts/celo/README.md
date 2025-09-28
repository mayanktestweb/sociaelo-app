# Celo Smart Contracts

This directory contains smart contracts deployed on the Celo network for identity verification functionality.

## Overview

The Celo contracts implement identity verification features using the Celo Identity Verification Hub, enabling users to verify their identities and maintain trusted profiles on the platform.

## Contract Deployment

### Prerequisites

- Access to [Remix IDE](https://remix.ethereum.org/)
- Celo wallet with testnet tokens
- Celo testnet network configured in your wallet

### Deployment Instructions

1. **Copy Contract Code**: Copy the contract code from the `.sol` files in this directory
2. **Open Remix**: Navigate to [Remix IDE](https://remix.ethereum.org/)
3. **Create New File**: Create a new Solidity file and paste the contract code
4. **Compile**: Compile the contract using Solidity compiler version 0.8.0 or higher
5. **Deploy**: Deploy the contract to Celo Testnet using the following parameters

### Constructor Parameters

When deploying the contract, use these constructor parameters:

1. **identityVerificationHubV2Address**: 
   ```
   0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
   ```
   > This is the official Identity Verification Hub V2 address for Celo Testnet

2. **scopeSeed**: 
   ```
   Any random text string (e.g., "sociaelo-identity-scope-2024")
   ```
   > Use any random text as the scope seed for your identity verification scope

### Network Configuration

- **Network**: Celo Alfajores Testnet
- **Chain ID**: 44787
- **RPC URL**: `https://alfajores-forno.celo-testnet.org`
- **Block Explorer**: `https://explorer.celo.org/alfajores`

### Getting Testnet Tokens

You can get free Celo testnet tokens from the [Celo Faucet](https://faucet.celo.org/).

## Contract Features

- Identity verification integration
- User profile management
- Decentralized identity proofs
- Cross-platform identity validation

## Support

For deployment issues or questions about the Celo contracts, please:
1. Check the [Celo Documentation](https://docs.celo.org/)
2. Visit the [Celo Discord](https://discord.com/invite/6yWMkgM)
3. Create an issue in this repository