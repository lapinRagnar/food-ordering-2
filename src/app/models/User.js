import  {Schema, model, models}  from "mongoose"

const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {
    type: String, 
    required: true,
    validate: pass => {
      if (!pass?.length || pass.length < 3) {
        throw new Error("Le mot de passe doit contenir au moins 3 caractères")
      }
    }
  }
}, {timestamps: true})

export const User = models?.User || model("User", UserSchema)