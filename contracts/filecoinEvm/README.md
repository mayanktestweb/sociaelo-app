# Filecoin EVM Smart Contracts

This directory contains smart contracts deployed on the Filecoin EVM network for user subscription and verification functionality.

## Overview

The Filecoin EVM contracts handle user subscription management and verification services, leveraging Filecoin's storage and compute capabilities to provide decentralized subscription services.

## Contract Deployment

### Prerequisites

- Access to [Remix IDE](https://remix.ethereum.org/)
- Filecoin EVM wallet with testnet tokens
- Filecoin Calibration testnet network configured in your wallet

### Deployment Instructions

1. **Copy Contract Code**: Copy the contract code from the `.sol` files in this directory
2. **Open Remix**: Navigate to [Remix IDE](https://remix.ethereum.org/)
3. **Create New File**: Create a new Solidity file and paste the contract code
4. **Compile**: Compile the contract using Solidity compiler version 0.8.0 or higher
5. **Deploy**: Deploy the contract to Filecoin Calibration Testnet

### Network Configuration

- **Network**: Filecoin Calibration Testnet
- **Chain ID**: 314159
- **RPC URL**: `https://api.calibration.node.glif.io/rpc/v1`
- **Block Explorer**: `https://calibration.filscan.io/`
- **Currency**: tFIL (Test Filecoin)

### Getting Testnet Tokens

You can get free testnet FIL tokens from:
- [Calibration Faucet](https://faucet.calibration.fildev.network/)
- Join the [Filecoin Slack](https://filecoin.io/slack) for faucet access

### Contract Features

- User subscription management
- Subscription verification and validation
- Payment processing for premium features
- Decentralized subscription state management
- Integration with Filecoin storage network

### Subscription Tiers

The contract supports multiple subscription tiers:
- **Free Tier**: Basic platform access
- **Premium Tier**: Enhanced features and storage
- **Pro Tier**: Advanced features and unlimited storage

## Development

### Local Testing

For local development and testing:

1. Use Hardhat or Truffle for local blockchain simulation
2. Deploy to local network first before testnet
3. Run comprehensive tests before mainnet deployment

### Contract Interaction

Example interaction patterns:
```solidity
// Subscribe user to premium tier
userSubscriptionsVerifier.subscribe(userAddress, premiumTier, duration);

// Verify user subscription status
bool isActive = userSubscriptionsVerifier.isSubscriptionActive(userAddress);

// Get subscription details
SubscriptionInfo memory info = userSubscriptionsVerifier.getSubscription(userAddress);
```

## Support

For deployment issues or questions about the Filecoin EVM contracts, please:
1. Check the [Filecoin EVM Documentation](https://docs.filecoin.io/smart-contracts/filecoin-evm/)
2. Visit the [Filecoin Slack](https://filecoin.io/slack)
3. Browse the [FVM Developer Resources](https://fvm.filecoin.io/)
4. Create an issue in this repository