import  {Schema, model, models}  from "mongoose"


const UserInfoSchema = new Schema({
  email: {type: String, required: true, unique: true},
  address: {type: String},
  city: {type: String},
  postalCode: {type: String},
  phone: {type: String},
  admin: {type: Boolean, default: true},

}, {timestamps: true})




export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema)