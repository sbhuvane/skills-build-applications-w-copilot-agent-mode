import mongoose, { Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('LeaderboardEntry', leaderboardEntrySchema);