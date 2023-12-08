import Trash from '@/app/components/icons/Trash'
import Plus from '@/app/components/icons/Plus'

const MenuItemPriceProps = ({name, addLabel, props, setProps}) => {



  const addProp = (ev, index, prop) => {
    setProps(oldProps => {
      return [...oldProps, {name: '', price: 0}]
    })
  }

  const editProp = (ev, index, prop) => {
    const newValue =ev.target.value
    setProps(prevSizes => {
      const newSizes = [...prevSizes]
      newSizes[index][prop] = newValue
      return newSizes
    })
  }

  const removeProp = (indexToRemove) => {
    setProps(prev => prev.filter((v, index) => index !== indexToRemove))
  }


  return (
    
    <div className="">

      <div>

        <div className='text-bold border-b mt-10'> {name} </div>

        {props.length > 0 && props.map((size, index) => (
          <div 
            key={size.name}
            className="flex gap-2 items-end"  
          >
            <div className="my-2">
              <label htmlFor="nom" className='text-sm'>Nom</label>
              <input 
                id="nom"
                name="nom"
                type="text" 
                placeholder="Nom de la taille"
                value={size.name}
                onChange={(ev) => editProp(ev, index, 'name')}
              />
            </div>

            <div className="my-2">
              <label htmlFor="prix" className='text-sm'>Extra Prix</label>
              <input 
                id="prix"
                name="prix"
                type="text" 
                placeholder="Exta Prix"
                value={size.price}
                onChange={(ev) => editProp(ev, index, 'price')}
              />
            </div>
            <div>
              <button 
                className="text-red-800 text-3xl" 
                type="button"
                onClick={() => removeProp(index)}
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
        onClick={addProp}
        className='w-full gap-2 flex items-center justify-start bg-transparent'
      >
        <div className='bg-transparent'>
          <Plus 
            className='w-10 h-10 bg-transparent hover:bg-transparent'
          />
        </div>
        <div className='bg-transparent'>
          {addLabel}
        </div>
      </button>
      
    </div>


  )
}

export default MenuItemPriceProps