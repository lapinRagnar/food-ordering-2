import  {Schema, model, models}  from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {
    type: String, 
    required: true,
    validate: pass => {
      if (!pass?.length || pass.length < 3) {
        throw new Error("Le mot de passe doit contenir au moins 3 caractères")
      }
    }
  },
  imageId: {type: String}
}, {timestamps: true})

UserSchema.pre("save", function(next) {
  var user = this;
  const SALT_WORK_FACTOR = 10

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      user.imageId = "gl63bhqwdlkxsb54bzid"
      next();
    })
  })

})

// UserSchema.post('validate', (user) => {
//   const notHashedPassword = user.password
//   const saltRounds = 10
//   bcrypt.hash(notHashedPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
//     console.log("je passe la",hash)
//     user.password = hash
//   })
// })

export const User = models?.User || model("User", UserSchema)