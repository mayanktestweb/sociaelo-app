import mongoose, { Document, Schema } from 'mongoose';

// User interface
export interface IUser extends Document {
  nullifier: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const userSchema = new Schema<IUser>({
  nullifier: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F', 'O']
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// User model
export const User = mongoose.model<IUser>('User', userSchema);

export default User;
