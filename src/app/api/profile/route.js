import mongoose from "mongoose";
import {options} from '../auth/[...nextauth]/Options'
import { getServerSession } from "next-auth"
import { User } from "@/app/models/User";


export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL)
  const data = await req.json()

  const session = await getServerSession(options)

  console.log('la session dans le api/profile pour update', session, {data})

  const email = session.user.email


  if ('name' in data) {
    // update user name
    console.log("je passe la");
    const result = await User.updateOne({email}, {name: data.name})

    console.log("la result de l'update", result)
  }

  return Response.json(true)
}