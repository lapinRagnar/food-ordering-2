import mongoose from "mongoose"
import {User} from "@/app/models/User"

export async function POST(req) {

  console.log("je suis dans POst api, la req est = ", req)

  const body = await req.json()
  console.log("le body est = ", body)

  mongoose.connect(process.env.MONGO_URL)

  const addImageId = await User.create(body)


  return Response.json(addImageId)
}