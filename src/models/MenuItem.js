import { Schema, model, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: {type: String},
  price: {type: Number},
})

const MenuItemSchema = new Schema({
  imageId: {type: String},
  name: {type: String},
  description: {type: String},
  basePrice: {type: Number},
  sizes: {type: [ExtraPriceSchema]},
  extraIngredientPrices: {type: [ExtraPriceSchema]},


}, {timestamps: true})

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema)