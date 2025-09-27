import express from 'express';
import { Post, IPost } from '../models/Post.js';
import { User } from '../models/User.js';

const router = express.Router();

// GET /api/posts - Get all posts with optional filters
router.get('/', async (req, res) => {
  try {
    const { isPublic, targetGender, creator } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (isPublic !== undefined) {
      filter.isPublic = isPublic === 'true';
    }
    
    if (targetGender) {
      filter.targetGender = targetGender;
    }
    
    if (creator) {
      filter.creator = creator;
    }

    const posts = await Post.find(filter)
      .populate('creator', 'nullifier gender')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    });
  }
});

// GET /api/posts/:id - Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('creator', 'nullifier gender');
      
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch post'
    });
  }
});

// POST /api/posts - Create new post
router.post('/', async (req, res) => {
  try {
    const { creator, mediaCid, textCid, isPublic, targetGender } = req.body;

    // Validate required fields
    if (!creator || !mediaCid || !textCid) {
      return res.status(400).json({
        success: false,
        error: 'Creator, mediaCid, and textCid are required'
      });
    }

    // Verify creator exists
    const creatorUser = await User.findById(creator);
    if (!creatorUser) {
      return res.status(404).json({
        success: false,
        error: 'Creator user not found'
      });
    }

    // Validate targetGender if provided
    if (targetGender && !['M', 'F', 'O'].includes(targetGender)) {
      return res.status(400).json({
        success: false,
        error: 'targetGender must be M, F, or O'
      });
    }

    // Create new post
    const post = new Post({
      creator,
      mediaCid,
      textCid,
      isPublic: isPublic !== undefined ? isPublic : true,
      targetGender
    });

    const savedPost = await post.save();
    
    // Populate creator data in response
    await savedPost.populate('creator', 'nullifier gender');

    res.status(201).json({
      success: true,
      data: savedPost,
      message: 'Post created successfully'
    });
  } catch (error: any) {
    console.error('Error creating post:', error);
    
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to create post'
      });
    }
  }
});

// PUT /api/posts/:id - Update post
router.put('/:id', async (req, res) => {
  try {
    const { mediaCid, textCid, isPublic, targetGender } = req.body;
    
    // Validate targetGender if provided
    if (targetGender && !['M', 'F', 'O'].includes(targetGender)) {
      return res.status(400).json({
        success: false,
        error: 'targetGender must be M, F, or O'
      });
    }

    const updateData: any = {};
    if (mediaCid !== undefined) updateData.mediaCid = mediaCid;
    if (textCid !== undefined) updateData.textCid = textCid;
    if (isPublic !== undefined) updateData.isPublic = isPublic;
    if (targetGender !== undefined) updateData.targetGender = targetGender;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('creator', 'nullifier gender');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      data: post,
      message: 'Post updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating post:', error);
    
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to update post'
      });
    }
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete post'
    });
  }
});

// GET /api/posts/user/:userId - Get posts by user
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ creator: req.params.userId })
      .populate('creator', 'nullifier gender')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user posts'
    });
  }
});

export default router;
