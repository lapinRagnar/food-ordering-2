import { User } from "@/app/models/User"
import mongoose from "mongoose"

export async function POST(req) {

  console.log("dans la route POST - back end")

  const body = await req.json()
  console.log("env", process.env.MONGODB_URI)
  mongoose.connect(process.env.MONGODB_URI)
  const createdUser = await User.create(body)

  return Response.json(createdUser)


}