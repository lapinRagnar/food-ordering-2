"use client"

import Link from "next/link"
import {  MdContactPhone, MdMenuBook  } from "react-icons/md"
import { FiInfo } from "react-icons/fi"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { TiUserAddOutline } from "react-icons/ti";
import { IoMdLogIn } from "react-icons/io";
import { useSession } from "next-auth/react"



const Header = () => {

  const session = useSession()
  console.log("la session", session)


  return (
    <>

      <header className=" mt-5 flex flex-col justify-center gap-5 items-center  md:justify-center md:flex-row md:items-center ">

        <Link href="/" className="text-primary font-bold md:text-2xl text-3xl">Pizza lapinRagnar</Link>

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
              <Link href={''} className="hidden sm:block">Contact</Link>
            </div>

          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 text-red-400">
              <IoMdLogIn size={25} />
              <Link href={'/login'} className="hidden sm:block">Login</Link>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-green-500 text-red-400">
              <TiUserAddOutline size={25} />
              <Link href={'/register'} className="hidden sm:block">Register</Link>
            </div>
          </div>

        </div>

      </header>

      <div className="md:border-b-2 border-primary mt-5"></div>

    </>
  )
}

export default Header