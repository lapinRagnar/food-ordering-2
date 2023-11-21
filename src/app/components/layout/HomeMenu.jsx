import Image from "next/image"
import MenuItem from "../menu/MenuItem"

const HomeMenu = () => {
  return (
    <section>

      <div className="  bg-yellow-500 -z-100 sm:block hidden">
        <div className="absolute left-150  ">
          <Image 
          src={'/salade1.jpeg'}
          width={200}
          height={200}
          alt="salade"
          />
        </div>
        <div className="absolute right-10 ">
          <Image 
          src={'/salade2.jpg'}
          width={200}
          height={200}
          alt="salade"
          />
        </div>
      </div>
      
      <div className="text-center pt-[90px] mt-[20px] ">

        <h3 className="uppercase text-gray-500 font-semibold ">
          Passer au paiement
        </h3>
        <h2 className="text-primary font-bold text-4xl">
          Menu
        </h2>

        <div 
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-5
            gap-5 
            mt-[40px] 
            mx-10"
          
        >
          
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />

        </div>

      </div>
    </section>
  )
}

export default HomeMenu