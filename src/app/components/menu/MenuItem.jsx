import { CldImage } from 'next-cloudinary'
import Image from "next/image"

const MenuItem = ({imageId, name, description, basePrice, sizes, extraIngredientPrices}) => {


  return (
    
    <div 
      className="
        bg-gray-700 
        p-1
        pb-5
        rounded-lg 
        text-center 
        h-70  
        hover:bg-#d30c0c-300
        transition-all ease-in duration-600
        hover:shadow-2xl
        hover:shadow-#2ae950-700
        flex flex-col justify-center items-center
      "
    >

      { imageId && (
        <CldImage
          width="250"
          height="250"
          src={imageId}
          sizes="100vw"
          alt="mon image"
          className=" bg-transparent mb-3"
        />
      )}

      <h4 className="font-bold  text-2xl bg-transparent">{name}</h4>
      <p className="text-gray-400 bg-transparent text-sm line-clamp-2">{description}</p>
      <button className="bg-amber-600 text-white px-4 rounded-sm mt-3">
        Ajouter au panier {basePrice}€
      </button>
      
    </div>


  )
}

export default MenuItem