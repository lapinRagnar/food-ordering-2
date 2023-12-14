import mongoose from "mongoose";
import {options} from '../auth/[...nextauth]/Options'
import { getServerSession } from "next-auth"
import { User } from "@/models/User"
import { UserInfo } from "@/models/UserInfo"



export async function PUT(req) {
  
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json()

  const {_id, name, imageId, ...otherUserInfo} = data 

  console.log('_id dans api profile', _id)

  const session = await getServerSession(options)
  const email = session.user.email

  let filter = {}
  
  if (_id) {
    filter = {_id}
  } else {
    filter = {email}
  }


  const user = await User.findOne(filter)
  
  const result = await User.updateOne(filter, {name, imageId})
  console.log("mettre à jour name et imageId", result)
  const result2 = await UserInfo.findOneAndUpdate({email: user.email}, otherUserInfo, {upsert: true})
  console.log("mettre à jour UserInfo", result2);

  
  return Response.json(true)
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL)

  const url = new URL(req.url)
  console.log("api get url ", url)

  const _id = url.searchParams.get('_id')
  console.log('id dans searchParams', _id);

  let filterUser = {}

  if (_id) {
    filterUser = {_id}
    // const userInfo = await UserInfo.findOne({email: user.email}).lean()

  } else {
    const session = await getServerSession(options)
    const email = session.user.email

    if (!email) {
      return Response.json({error: 'Pas connecté!'})
    }

    filterUser = {email}
    
  }
  
  const user = await User.findOne(filterUser).lean()
  const userInfo = await UserInfo.findOne({email: user.email}).lean()

  return Response.json({...user, ...userInfo})

}