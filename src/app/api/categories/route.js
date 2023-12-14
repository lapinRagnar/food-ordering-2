import { Category } from '@/models/Category'
import mongoose from 'mongoose'

export async function POST(req) {

  mongoose.connect(process.env.MONGO_URL)
 
  const { name } = await req.json()

  const categoryDoc = await Category.create({name})

  return Response.json(categoryDoc)

}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL)
  const {_id, name} = await req.json()
  await Category.updateOne({_id}, {name})
  return Response.json(true)
}


export async function GET() {
  mongoose.connect(process.env.MONGO_URL)
  return Response.json(
    await Category.find()
  )
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL)
  
  // console.log("req dans DELETE API", req)
  
  const url = new URL(req.url)


  console.log("id url ", url)

  const _id = url.searchParams.get('_id')
  console.log('id dans searchParams', _id);



  // console.log("url dans DELETE API", url)

  // const search = url.searchParams.get('_id')
  // console.log("search dans DELETE API", search)

  // const _id = url.searchParams.get('_id')
  // console.log("_id dans DELETE API", _id)

  const res = await Category.deleteOne({_id})
  console.log("res du delete", res)
  return Response.json(true)
}