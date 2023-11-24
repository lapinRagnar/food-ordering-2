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

      <form className="max-w-sm mx-auto border">

        <div>
          <Image src={userImage} alt="user image" width={64} height={64} />
        </div>
      
      </form>


    </section>
  )
}

export default ProfilePage