'use client'

import Image from "next/image"
import MenuItem from "../menu/MenuItem"
import SectionHeaders from "./SectionHeaders"
import { useEffect, useState } from "react"

const HomeMenu = () => {

  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        console.log('menuItems', menuItems)
        setBestSellers(menuItems.slice(-3))
      })
    })
  }, [])

  console.log('bestSellers dans home menu', bestSellers);

  return (
    <section>

      <div className="  bg-yellow-500 -z-100 sm:block hidden">
        <div className="absolute left-150  ">
          <Image 
          src={'/dessert.webp'}
          width={200}
          height={200}
          alt="salade"
          />
        </div>
        <div className="absolute right-10 ">
          <Image 
          src={'/salade4.png'}
          width={200}
          height={200}
          alt="salade"
          />
        </div>
      </div>
      
      <div className="text-center pt-[90px] mt-[20px] ">

        <SectionHeaders 
          subHeader="Passer au paiement"
          mainHeader="Meilleurs ventes"
        />

        <div 
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-3
            gap-5 
            mt-[40px] 
            mx-10"
          
        >
          
          {bestSellers?.length > 0 && bestSellers.map(item => (
            <MenuItem key={item.id} {...item} />
          ))}

        </div>

      </div>
    </section>
  )
}

export default HomeMenu