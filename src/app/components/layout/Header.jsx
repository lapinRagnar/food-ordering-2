"use client"

import { SessionProvider } from 'next-auth/react'

import Link from "next/link"
import {  MdContactPhone, MdMenuBook  } from "react-icons/md"
import { FiInfo } from "react-icons/fi"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { TiUserAddOutline } from "react-icons/ti"
import { IoMdLogOut } from "react-icons/io"

import { IoMdLogIn } from "react-icons/io"
import { signOut, useSession } from "next-auth/react"

import { useEffect, useState } from "react"



const Header = () => {
  

  
  const { data: session, status } = useSession()
  console.log("la session dans la navbar", session)

  useEffect(() => {
    console.log('je suis dans le useEffect', session)
  }, [session])

  // const status = session.status
  // console.log("le status ----", status)
  // console.log("la session dans header", session)


  // const userData = session.data?.user
  // let userName = userData?.name || userData?.email

  // recuperer juste le nome de l'utilisateur
  // if (userName?.includes(' ')) {
  //   userName = userName.split(' ')[0]
  // }

  return (
    <>

      
    
        <header className=" mt-5 flex flex-col justify-center gap-5 items-center  md:justify-center md:flex-row md:items-center ">

        <Link href="/" className="text-primary font-bold md:text-2xl text-3xl whitespace-nowrap">Pizza lapinRagnar</Link>

        <div className="flex items-center justify-between md:w-[800px] w-[400px] h-full ">
          
          <nav className="flex items-center justify-center space-x-10 text-gray-600 font-semibold w-[200px] sm:w-[600px] ">

            <div className="flex items-center gap-2 cursor-pointer  hover:text-green-500 ">
              <SiHomeassistantcommunitystore size={25} />
              <Link href={'/'} className="hidden sm:block">Accueil</Link>
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 ">
              <MdMenuBook  size={25} />
              <Link href={''} className="hidden sm:block cursor-pointer">Menu</Link>
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 ">
              <FiInfo size={25} />
              <Link href={''} className="hidden sm:block">A props</Link>
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 ">
              <MdContactPhone size={25} />
              <Link href={''} className="hidden sm:block m-0">Contact</Link>
            </div>

          </nav>

          <div className="flex items-center justify-center gap-2">

            { session ? (

              <>              

                <Link 
                  href={'/profile'}
                  className="text-green-800 font-bold whitespace-nowrap"
                >
                  Bonjour,  ({session?.user?.email})
                </Link>
                

                <div 
                  className="m-0 flex items-center justify-center gap-1 cursor-pointer hover:text-green-500 text-red-400"
                  onClick={() => signOut()}  
                >
                  <IoMdLogOut size={35} />
                  {/*<button 
                    className="hidden sm:block m-0"
                  >
                    Logout
                  </button>*/}
                </div>
              
              </>

            ) : (

              <>

                <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 text-red-400">
                  <IoMdLogIn size={25} />
                  <Link href={'/login'} className="hidden sm:block">Login</Link>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 text-red-400">
                  <TiUserAddOutline size={25} />
                  <Link href={'/register'} className="hidden sm:block">Register</Link>
                </div>
              
              
              </>
            )
          
          }




          </div>

        </div>

        </header>

        <div className="md:border-b-2 border-primary mt-5"></div>



    </>
  )
}

export default Header