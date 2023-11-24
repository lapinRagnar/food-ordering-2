import mongoose from "mongoose";
import {options} from '../auth/[...nextauth]/Options'
import { getServerSession } from "next-auth"


export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json()

  const session = await getServerSession(options)

  console.log('la session dans le api/profile pour update', session)

  if ('name' in data) {
    // update user name

  }

  return Response.json(true)
}