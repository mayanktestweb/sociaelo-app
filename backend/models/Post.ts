import mongoose, { Document, Schema } from 'mongoose';

// Post interface
export interface IPost extends Document {
  creator: string; // nullifier from User model
  mediaCid: string;
  textCid: string;
  isPublic: boolean;
  targetGender?: 'M' | 'F' | 'O';
  createdAt: Date;
  updatedAt: Date;
}

// Post schema
const postSchema = new Schema<IPost>({
  creator: {
    type: String,
    required: true,
    trim: true
  },
  mediaCid: {
    type: String,
    required: true,
    trim: true
  },
  textCid: {
    type: String,
    required: true,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  targetGender: {
    type: String,
    enum: ['M', 'F', 'O'],
    required: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Add index for better query performance
postSchema.index({ creator: 1 });
postSchema.index({ isPublic: 1 });
postSchema.index({ targetGender: 1 });
postSchema.index({ createdAt: -1 });

// Post model
export const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
