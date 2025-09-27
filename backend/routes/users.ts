import express from 'express';
import { ethers } from 'ethers';
import { User, IUser } from '../models/User.js';

const router = express.Router();

// Smart contract ABI for the usersData mapping (only the necessary parts)
const contractABI = [
  {
    "inputs": [{"name": "", "type": "address"}],
    "name": "usersData",
    "outputs": [
      {"name": "nullifier", "type": "uint256"},
      {"name": "gender", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Initialize provider
const getProvider = () => {
  const rpcUrl = process.env.RPC_URL || 'https://eth.llamarpc.com';
  return new ethers.JsonRpcProvider(rpcUrl);
};

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
});

// GET /api/users/contract/:address - Test smart contract query without saving to database
router.get('/contract/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    // Validate Ethereum address format
    if (!ethers.isAddress(address)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Ethereum address format'
      });
    }

    // Get smart contract address from environment
    const contractAddress = process.env.SMART_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return res.status(500).json({
        success: false,
        error: 'Smart contract address not configured'
      });
    }

    // Initialize provider and contract
    const provider = getProvider();
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Query the smart contract for user data
    const userData = await contract.usersData(address);
    
    // Extract nullifier and gender from the contract response
    const nullifier = userData.nullifier.toString();
    const gender = userData.gender;

    res.json({
      success: true,
      data: {
        address,
        nullifier,
        gender,
        exists: nullifier !== '0' && gender !== ''
      },
      message: 'Smart contract data retrieved successfully'
    });
  } catch (error: any) {
    console.error('Error querying smart contract:', error);
    
    if (error.code === 'NETWORK_ERROR' || error.code === 'SERVER_ERROR') {
      res.status(503).json({
        success: false,
        error: 'Unable to connect to blockchain network'
      });
    } else if (error.code === 'CALL_EXCEPTION') {
      res.status(400).json({
        success: false,
        error: 'Smart contract call failed. Contract may not be deployed at this address.'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to query smart contract'
      });
    }
  }
});

// POST /api/users - Create new user from Ethereum address
router.post('/', async (req, res) => {
  try {
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        error: 'Ethereum address is required'
      });
    }

    // Validate Ethereum address format
    if (!ethers.isAddress(address)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Ethereum address format'
      });
    }

    // Get smart contract address from environment
    const contractAddress = process.env.SMART_CONTRACT_ADDRESS;
    if (!contractAddress) {
      return res.status(500).json({
        success: false,
        error: 'Smart contract address not configured'
      });
    }

    // Initialize provider and contract
    const provider = getProvider();
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    // Query the smart contract for user data
    const userData = await contract.usersData(address);
    
    // Extract nullifier and gender from the contract response
    const nullifier = userData.nullifier.toString();
    const gender = userData.gender;

    // Validate that user data exists (nullifier should not be 0 for existing users)
    if (nullifier === '0' || !gender) {
      return res.status(404).json({
        success: false,
        error: 'User data not found in smart contract'
      });
    }

    // Check if user already exists in database
    const existingUser = await User.findOne({ nullifier });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        data: existingUser,
        message: 'User already exists, returned existing data',
        contractData: {
          address,
          nullifier,
          gender
        },
        isNewUser: false
      });
    }

    // Create new user
    const user = new User({ nullifier, gender });
    const savedUser = await user.save();
    
    res.status(201).json({
      success: true,
      data: savedUser,
      message: 'User created successfully',
      contractData: {
        address,
        nullifier,
        gender
      },
      isNewUser: true
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: 'User with this nullifier already exists'
      });
    } else if (error.code === 'NETWORK_ERROR' || error.code === 'SERVER_ERROR') {
      res.status(503).json({
        success: false,
        error: 'Unable to connect to blockchain network'
      });
    } else if (error.code === 'CALL_EXCEPTION') {
      res.status(400).json({
        success: false,
        error: 'Smart contract call failed. Address may not exist in contract.'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to create user'
      });
    }
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
  try {
    const { nullifier, gender } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nullifier, gender },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: 'User with this nullifier already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to update user'
      });
    }
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

export default router;
