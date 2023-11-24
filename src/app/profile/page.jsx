"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"

const ProfilePage = () => {

  const session = useSession()
  console.log("la session dans profile", session)

  const {status} = session

  if (status === 'loading') {
    return 'Chargement en cours...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const userImage = session.data?.user?.image

  
  return (
    <section>
      <h1 className="
        mt-10
        text-center 
        mb-10 text-5xl text-primary 
        font-bold font-weight-900 uppercase from-neutral-800">
        Profile
      </h1>

      <form className="max-w-xl mx-auto border">

        <div className="flex items-center gap-8">
          
          <div>
            <div className="bg-gray-700 p-2 rounded-lg flex flex-col items-center justify-center ">
              <Image 
                src={userImage} 
                alt="user image" 
                width={80} 
                height={80} 
                className="rounded-full"
              />
              <button className="m-0 p-0 text-gray-200 hover:text-green-500 hover:text-lg whitespace-nowrap" type="button">Modifier avatar</button>
            </div>
          </div>

          <div className="grow">
            <input 
              type="text" 
              placeholder="Nom et prenom" 
              className=""
            />
            <input type="email" value={session.data?.user?.email} disabled />
            <button className="m-0 p-0 h-10  whitespace-nowrap" type="submit">Enregister</button>
          </div>
        </div>
      
      </form>


    </section>
  )
}

export default ProfilePage