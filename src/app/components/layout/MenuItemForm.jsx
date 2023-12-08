

import EditableImage from "@/app/components/layout/EditableImage"
import { useState, } from "react"

const MenuItemForm = ({onSubmit, menuItem}) => {

  const [imageId, setImageId] = useState(menuItem?.imageId || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [description, setDescription] = useState(menuItem?.description || '')


  return (
    <div>

      <form 
        className="p-5 bg-green-900" 
        onSubmit={e =>onSubmit(e, {imageId, name, basePrice, description})}
      >

        <div className="flex gap-4 justify-center items-center">
          <div className='min-w-[150px] max-w-[200px] bg-yellow-200 grow'>
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
            <div className="w-[150px]">
              <button type="submit">Enregistrer</button>
            </div>

          </div>

        </div>

      </form>

    </div>
  )
}

export default MenuItemForm