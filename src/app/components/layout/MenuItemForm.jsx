import MenuItemPriceProps from "@/app/components/layout/MenuItemPriceProps"

import EditableImage from "@/app/components/layout/EditableImage"
import { useEffect, useState, } from "react"
import MenuItem from "../menu/MenuItem"

const MenuItemForm = ({onSubmit, menuItem}) => {

  const [imageId, setImageId] = useState(menuItem?.imageId || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [description, setDescription] = useState(menuItem?.description || '')

  const [sizes, setSizes] = useState(menuItem?.sizes || [])
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || [])

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(MenuItem?.category || '')

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories)
      })
    })
  }, [])

  console.log('categories', categories)


  return (
    <div>

      <form 
        className="p-5" 
        onSubmit={e =>onSubmit(e, {imageId, name, basePrice, description, sizes, extraIngredientPrices, category})}
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

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.length > 0 && categories.map(category => (
                <option 
                key={category._id}
                value={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
            
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



            <div className="w-[150px] mt-5">
              <button 
                type="submit"
                className='w-full text-xl text-gray-300'
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