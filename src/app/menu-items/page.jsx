"use client"


import { CldImage, } from 'next-cloudinary'


import Link from "next/link"
import { useProfile } from "../components/UseProfile"
import UserTabs from "../components/layout/UserTabs"

import Right from "@/app/components/icons/Right"
import { useEffect, useState } from "react"


const MenuItemsPage = () => {

  const [menuItems, setMenuItems] = useState([])
  const {data: profileData, loading: profileLoading} = useProfile()

  useEffect(() => {
    fetch('/api/menu-items').then(response => {
      response.json().then(menuItems => {
        setMenuItems(menuItems)
      })
    })
  }, [])

  console.log('menuItems', menuItems)

  if (profileLoading) {
    return <div 
      className="
        min-h-screen text-4xl text-red-900
        font-bold top-1/3 left-1/2 absolute transform -translate-x-1/2
      "
      >
      Chargement de l&apos;info utilisateur...
      </div>
  }

  if (!profileData.admin) {
    return <div
      className="
        min-h-screen text-4xl text-red-900
        font-bold top-1/3 left-1/2 absolute transform -translate-x-1/2
      "
    >
      Vous n&apos;etes pas autorisé!
    </div>
  }
  

  return (

    <section className="min-h-[600px]">

      <UserTabs admin={true} />


      <div 
        className="
          max-w-[800px] mx-auto  
          bg-[#4e9b65] 
          p-2
          shadow-lg shadow-slate-600
          bg-gradient-to-r from-green-200 via-green-400 to-purple-700
          rounded-sm
        "
      >

        <div className="flex flex-col p-10 rounded-sm">

          <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-5">

            <Link 
              className="flex items-center justify-center gap-2"
              href="/menu-items/new"
            > 
              <div className="bg-transparent  ">
                Ajouter un menu
              </div>

              <Right 
                className="bg-transparent w-10" 
              />

            </Link>

          </div>

          <div className="w-full">
            
            <h1 className='text-2xl mb-3 text-amber-700 font-bold'>Modifier les menus</h1>

            <div className='grid grid-cols-3 gap-4'>

              { menuItems?.length > 0 && menuItems.map((item) => (
                <Link
                  href={`/menu-items/edit/${item._id}`} 
                  key={item._id} 
                  className="
                    mb-2 w-full flex flex-col gap-5
                    rounded-sm  
                  "
                > 
                  <div className='flex items-center justify-center max-h-[400px]'>
                    <CldImage
                      width="400"
                      height="400"
                      src={item.imageId}
                      alt="mon image"
                      className=" mb-3 text-center rounded-sm"
                    />
                  </div>

                  <div className="text-center">
                    {item.name} 
                  </div>

                </Link>
              ))}

            </div>

          </div>
        
        </div>
      
      </div>

    </section>
  )
}

export default MenuItemsPage