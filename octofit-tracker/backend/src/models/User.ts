import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    displayName: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);