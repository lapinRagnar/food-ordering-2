import MenuItemPriceProps from "@/app/components/layout/MenuItemPriceProps"

import EditableImage from "@/app/components/layout/EditableImage"
import { useState, } from "react"

const MenuItemForm = ({onSubmit, menuItem}) => {

  const [imageId, setImageId] = useState(menuItem?.imageId || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [description, setDescription] = useState(menuItem?.description || '')

  const [sizes, setSizes] = useState([])
  const [extraIngredientPrices, setExtraIngredientPrices] = useState([])

  return (
    <div>

      <form 
        className="p-5" 
        onSubmit={e =>onSubmit(e, {imageId, name, basePrice, description, sizes, extraIngredientPrices})}
      >

        <div className="flex gap-4 justify-center items-center">
          
          <div className='min-w-[150px] max-w-[200px] grow'>
            <EditableImage imageId={imageId} setImageId={setImageId}/>
          </div>

          <div className="grow">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)} 
              type="text" 
              placeholder="Nom menu"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              type="text" 
              placeholder="Description"
            />
            <input
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)} 
              type="text" 
              placeholder="Prix de base"
            />



            <MenuItemPriceProps 
              name="Taille" 
              addLabel="Ajout taille (Small, Medium, Large) et extra prix"
              props={sizes} 
              setProps={setSizes} 
            />

            <MenuItemPriceProps 
              name="Extra Ingredient" 
              addLabel="Ajout taille extra ingredient"
              props={extraIngredientPrices} 
              setProps={setExtraIngredientPrices} 
            />



            <div className="w-[150px]">
              <button 
                type="submit"
                className='w-full '
                >
                 Enregistrer
              </button>
            </div>

          </div>

        </div>

      </form>

    </div>
  )
}

export default MenuItemForm