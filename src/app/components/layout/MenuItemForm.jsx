import Trash from '@/app/components/icons/Trash'
import Plus from '@/app/components/icons/Plus'

import EditableImage from "@/app/components/layout/EditableImage"
import { useState, } from "react"

const MenuItemForm = ({onSubmit, menuItem}) => {

  const [imageId, setImageId] = useState(menuItem?.imageId || '')
  const [name, setName] = useState(menuItem?.name || '')
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
  const [description, setDescription] = useState(menuItem?.description || '')

  const [sizes, setSizes] = useState([])

  const addSize = (ev, index, prop) => {
    setSizes(oldSizes => {
      return [...oldSizes, {name: '', price: 0}]
    })
  }

  const editSize = (ev, index, prop) => {
    const newValue =ev.target.value
    setSizes(prevSizes => {
      const newSizes = [...prevSizes]
      newSizes[index][prop] = newValue
      return newSizes
    })
  }

  const removeSize = (indexToRemove) => {
    setSizes(prev => prev.filter((v, index) => index !== indexToRemove))
  }


  return (
    <div>

      <form 
        className="p-5" 
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

            <div className="">

              <div>
                {sizes.length > 0 && sizes.map((size, index) => (
                  <div 
                    key={size.name}
                    className="flex gap-2 items-end"  
                  >
                    <div className="my-2">
                      <label htmlFor="nom">Nom</label>
                      <input 
                        id="nom"
                        name="nom"
                        type="text" 
                        placeholder="Nom de la taille"
                        value={size.name}
                        onChange={(ev) => editSize(ev, index, 'name')}
                      />
                    </div>

                    <div className="my-2">
                      <label htmlFor="prix">Prix</label>
                      <input 
                        id="prix"
                        name="prix"
                        type="text" 
                        placeholder="Exta Prix"
                        value={size.price}
                        onChange={(ev) => editSize(ev, index, 'price')}
                      />
                    </div>
                    <div>
                      <button 
                        className="text-red-800 text-3xl" 
                        type="button"
                        onClick={() => removeSize(index)}
                      >
                        <Trash 
                          className="bg-transparent w-6 h-6 text-red-600"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSize}
                className='w-full gap-2 flex items-center justify-start bg-transparent'
              >
                <div className='bg-transparent'>
                  <Plus 
                    className='w-10 h-10 bg-transparent hover:bg-transparent'
                  />
                </div>
                <div className='bg-transparent'>
                  Ajout taille (Small, Medium, Large) et extra prix
                </div>
              </button>
            </div>

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