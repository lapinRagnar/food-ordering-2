import { MenuItem } from "@/models/MenuItem"
import mongoose from "mongoose"

export async function POST(req) {

  mongoose.connect(process.env.MONGO_URL)
  
  const data = await req.json()

  const menuItemDoc = await MenuItem.create(data)

  return Response.json(menuItemDoc)

}

export async function PUT(req) {

  mongoose.connect(process.env.MONGO_URL)
  
  const {_id, ...data} = await req.json()

  const menuItemDoc = await MenuItem.findByIdAndUpdate(_id, data)

  return Response.json(menuItemDoc)

}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL)
  return Response.json(
    await MenuItem.find()
  )
}

export async function DELETE(req) {

  mongoose.connect(process.env.MONGO_URL)
    
  const url = new URL(req.url)
  console.log("id url ", url)

  const _id = url.searchParams.get('_id')
  console.log('id dans searchParams', _id);


  const res = await MenuItem.deleteOne({_id})
  console.log("res du delete", res)
  
  return Response.json(true)


}