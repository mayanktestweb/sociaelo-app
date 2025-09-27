# Sociaelo Backend API

A modern REST API built with Bun, Express.js, TypeScript, and MongoDB for the Sociaelo application.

## Features

- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **TypeScript** - Type-safe JavaScript
- **CORS** - Cross-Origin Resource Sharing enabled for all origins
- **Environment Variables** - Configuration management with dotenv
- **Error Handling** - Comprehensive error handling middleware
- **Blockchain Integration** - Ethereum smart contract integration with ethers.js
- **Smart Contract Queries** - Automatic user data retrieval from deployed contracts

## Prerequisites

- [Bun](https://bun.sh) runtime installed
- MongoDB installed and running locally (or MongoDB Atlas connection)

## Installation

```bash
bun install
```

## Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sociaelo
NODE_ENV=development
RPC_URL=https://eth.llamarpc.com
SMART_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
```

**Environment Variables:**
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment mode
- `RPC_URL` - Ethereum RPC URL for blockchain queries
- `SMART_CONTRACT_ADDRESS` - Address of the deployed smart contract

## Running the Application

### Development (with hot reload)
```bash
bun run dev
```

### Production
```bash
bun run start
```

## API Endpoints

### Health Check
- `GET /` - API status and basic info
- `GET /api/health` - Health check with database connection status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/contract/:address` - Test smart contract query (does not save to database)
- `POST /api/users` - Create new user from Ethereum address (queries smart contract)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts
- `GET /api/posts` - Get all posts with optional filters (isPublic, targetGender, creator)
- `GET /api/posts/:id` - Get post by ID
- `GET /api/posts/user/:userId` - Get posts by specific user
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Request/Response Format

#### Create User from Ethereum Address
```json
POST /api/users
{
  "address": "0x1234567890123456789012345678901234567890"
}
```

#### Create Post
```json
POST /api/posts
{
  "creator": "user_id_from_mongodb",
  "mediaCid": "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  "textCid": "QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy",
  "isPublic": true,
  "targetGender": "M"
}
```

#### Response Format
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "nullifier": "12345678901234567890",
    "gender": "M",
    "createdAt": "2025-09-27T...",
    "updatedAt": "2025-09-27T..."
  },
  "message": "User created successfully",
  "contractData": {
    "address": "0x1234567890123456789012345678901234567890",
    "nullifier": "12345678901234567890",
    "gender": "M"
  }
}
```

#### Post Response Format
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "creator": {
      "_id": "...",
      "nullifier": "12345678901234567890",
      "gender": "M"
    },
    "mediaCid": "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
    "textCid": "QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy",
    "isPublic": true,
    "targetGender": "M",
    "createdAt": "2025-09-27T...",
    "updatedAt": "2025-09-27T..."
  },
  "message": "Post created successfully"
}
```

## Smart Contract Integration

The API integrates with an Ethereum smart contract that stores user data. The contract should have a public mapping called `usersData` with the following structure:

```solidity
struct UserData {
    uint256 nullifier;
    string gender;
}

mapping(address => UserData) public usersData;
```

When creating a user via `POST /api/users`, the API:
1. Validates the provided Ethereum address
2. Queries the smart contract using the address
3. Extracts the `nullifier` and `gender` from the contract
4. Stores this data in the MongoDB database

## Project Structure

```
backend/
├── models/
│   ├── User.ts          # User model schema
│   └── Post.ts          # Post model schema
├── routes/
│   ├── users.ts         # User routes
│   └── posts.ts         # Post routes
├── index.ts             # Main application file
├── package.json
├── tsconfig.json
└── .env                 # Environment variables
```

## CORS Configuration

CORS is configured to allow all origins. In production, you should restrict this to your frontend domain:

```typescript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

This project was created using `bun init` and enhanced with Express.js and MongoDB.
