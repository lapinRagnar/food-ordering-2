import MenuItemPriceProps from "@/app/components/layout/MenuItemPriceProps"

import EditableImage from "@/app/components/layout/EditableImage"
import { useState, } from "react"

const MenuItemForm = ({onSubmit, menuItem}) => {

  const [imageId, setImageId] = useState(menuItem?.imageId || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [description, setDescription] = useState(menuItem?.description || '')

  const [sizes, setSizes] = useState(menuItem?.sizes || [])
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || [])

  return (
    <div>

      <form 
        className="p-5" 
        onSubmit={e =>onSubmit(e, {imageId, name, basePrice, description, sizes, extraIngredientPrices})}
      >

        <div className="flex gap-4 justify-center items-start">
          
          <div className='min-w-[350px] max-w-[350px] grow'>
            <EditableImage imageId={imageId} setImageId={setImageId}/>
          </div>

          <div className="grow">
            
            {/* <div className=" grow-0 w-[110px]">Nom du menu</div> */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)} 
              type="text" 
              placeholder="Nom menu"
            />

            {/* <div className=" grow-0 w-[110px]">Description</div> */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              type="text" 
              placeholder="Description"
            />
            
            {/* <div className="grow-0 w-[110px]">Prix de base</div> */}
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