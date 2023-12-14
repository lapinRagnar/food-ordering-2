import {User} from '@/models/User'
import mongoose from 'mongoose';

export async function GET() {
  mongoose.connect(process.env.MONGO_URL)
  const users = await User.find()
  console.log('users api', users);

  return Response.json(users)
}