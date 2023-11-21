import Image from "next/image"

const MenuItem = () => {
  return (
    
    <div 
      className="
        bg-gray-300 
        p-4 
        rounded-lg 
        text-center 
        h-70  
        hover:bg-red-300
        transition-all ease-in duration-600
        hover:shadow-2xl
        hover:shadow-fuchsia-700
        flex flex-col justify-center items-center
      "
    >
      <Image 
        className="rounded-sm"
        src={'/pizza2.png'}
        alt="pizza"
        width={200}
        height={200}
      />
      <h4 className="font-bold mt-4 text-2xl bg-transparent">Pepperoni pizza</h4>
      <p className="text-gray-700 bg-transparent text-xs my-4">La pizza au pepperoni est une pizza garnie de tranches de pepperoni, un type de saucisson épicé d&apos;origine italienne. </p>
      <button className="bg-primary text-white px-4 py-2 rounded-sm mt-3">
        Ajouter au panier - 12€
      </button>
      
    </div>


  )
}

export default MenuItem