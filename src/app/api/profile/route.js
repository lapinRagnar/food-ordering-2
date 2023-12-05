import mongoose from "mongoose";
import {options} from '../auth/[...nextauth]/Options'
import { getServerSession } from "next-auth"
import { User } from "@/models/User"


export async function PUT(req) {
  
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json()

  const session = await getServerSession(options)

  console.log('profile pour update - sesssion et data', session, {data})

  const email = session.user.email

  console.log("je passe la");
  const result = await User.updateOne({email}, data)
  console.log("la result de l'update", result)
  
  
  return Response.json(true)
}