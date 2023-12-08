import mongoose from "mongoose";
import {options} from '../auth/[...nextauth]/Options'
import { getServerSession } from "next-auth"
import { User } from "@/models/User"
import { UserInfo } from "@/models/UserInfo"


export async function PUT(req) {
  
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json()

  const {name, imageId, ...otherUserInfo} = data 

  const session = await getServerSession(options)



  const email = session.user.email


  const result = await User.updateOne({email}, {name, imageId})

  console.log("la result de l'update", result)

  const result2 = await UserInfo.findOneAndUpdate({email}, otherUserInfo, {upsert: true})
  
  
  return Response.json(true)
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL)
  const session = await getServerSession(options)
  const email = session.user.email

  const user = await User.findOne({email}).lean()
  const userInfo = await UserInfo.findOne({email}).lean()
  return Response.json({...user, ...userInfo})
}