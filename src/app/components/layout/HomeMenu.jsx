import Image from "next/image"
import MenuItem from "../menu/MenuItem"
import SectionHeaders from "./SectionHeaders"

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

        <SectionHeaders 
          subHeader="Passer au paiement"
          mainHeader="Menu"
        />

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