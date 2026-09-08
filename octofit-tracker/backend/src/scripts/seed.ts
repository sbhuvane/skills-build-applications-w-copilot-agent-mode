import mongoose from 'mongoose';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen' },
      { username: 'jordan-rivera', email: 'jordan.rivera@example.com', displayName: 'Jordan Rivera' },
      { username: 'sam-taylor', email: 'sam.taylor@example.com', displayName: 'Sam Taylor' },
      { username: 'alex-okafor', email: 'alex.okafor@example.com', displayName: 'Alex Okafor' },
    ]);

    const teams = await Team.create([
      { name: 'Summit Striders', members: [users[0]._id, users[1]._id] },
      { name: 'Trail Blazers', members: [users[2]._id, users[3]._id] },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'Running', durationMinutes: 42, points: 84, completedAt: new Date('2026-09-01T07:30:00Z') },
      { userId: users[1]._id, type: 'Cycling', durationMinutes: 55, points: 110, completedAt: new Date('2026-09-02T17:15:00Z') },
      { userId: users[2]._id, type: 'Strength training', durationMinutes: 35, points: 70, completedAt: new Date('2026-09-03T06:45:00Z') },
      { userId: users[3]._id, type: 'Yoga', durationMinutes: 30, points: 45, completedAt: new Date('2026-09-04T18:00:00Z') },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 420 },
      { userId: users[1]._id, teamId: teams[0]._id, points: 385 },
      { userId: users[2]._id, teamId: teams[1]._id, points: 360 },
      { userId: users[3]._id, teamId: teams[1]._id, points: 315 },
    ]);

    await Workout.create([
      { name: 'Quick Cardio Boost', description: 'A brisk interval session to build endurance and energy.', difficulty: 'beginner', durationMinutes: 20 },
      { name: 'Full-Body Strength', description: 'A balanced strength routine for legs, core, and upper body.', difficulty: 'intermediate', durationMinutes: 40 },
      { name: 'Peak Performance Circuit', description: 'A demanding circuit for experienced athletes ready to push their limits.', difficulty: 'advanced', durationMinutes: 55 },
    ]);

    console.log('Seeded users, teams, activities, leaderboard entries, and workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
