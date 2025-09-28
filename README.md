# Sociaelo App

A decentralized social platform built on blockchain technology, combining social networking with verifiable credentials and multi-chain support.

## Overview

Sociaelo App is a Web3-powered social platform that enables users to create profiles, share posts, and interact with content while maintaining verifiable identity through Self.xyz and cross-chain functionality.

## Tech Stack

- **Frontend**: React with TypeScript, Vite
- **Backend**: Bun runtime with TypeScript
- **Identity Verification**: Self.xyz integration
- **Smart Contracts**: 
  - Celo Network (Identity Verification via Self.xyz)
  - Filecoin EVM (User Subscriptions)
- **Web3 Integration**: Multi-chain wallet support

## Project Structure

```
sociaelo-app/
├── web-client/          # React frontend application
├── backend/             # Backend API server
├── contracts/           # Smart contracts
│   ├── celo/           # Celo network contracts
│   └── filecoinEvm/    # Filecoin EVM contracts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Bun runtime
- Web3 wallet (MetaMask recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mayanktestweb/sociaelo-app.git
   cd sociaelo-app
   ```

2. Install frontend dependencies:
   ```bash
   cd web-client
   bun install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   bun install
   ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   bun run dev
   ```

2. Start the frontend development server:
   ```bash
   cd web-client
   bun run dev
   ```

3. Open your browser to `http://localhost:5173`

## Smart Contracts

### Identity Verification (Celo Network)

Our identity verification system is built on top of **Self.xyz**, a decentralized identity platform. Since Self.xyz's onchain verification infrastructure is exclusively available on the Celo network, we've deployed our identity verification contract there to leverage their robust identity verification capabilities.

### User Subscriptions (Filecoin EVM)

Subscription management and premium feature access are handled through smart contracts deployed on Filecoin EVM, taking advantage of Filecoin's decentralized storage network.

See the respective README files in the contracts directory:
- [Celo Contracts (Self.xyz Identity)](./contracts/celo/README.md)
- [Filecoin EVM Contracts](./contracts/filecoinEvm/README.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
