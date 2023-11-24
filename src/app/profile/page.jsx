"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const ProfilePage = () => {
  

  const session = useSession()
  console.log("la session dans profile", session)

  const {status} = session

  const [userName, setUserName] = useState('')

  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data?.user?.name)
    } 
  }, [status, session])

  if (status === 'loading') {
    return 'Chargement en cours...'
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  const userImage = session.data?.user?.image

  const handleProfileInfoUpdate = async (ev) => {
    ev.preventDefault()

    setSaved(false)
    setIsSaving(true)

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName
      })
    })

    setIsSaving(false)

    if (response.ok) {
      setSaved(true)
    }

  }

  
  return (
    <section>
      <h1 className="
        mt-10
        text-center 
        mb-10 text-5xl text-primary 
        font-bold font-weight-900 uppercase from-neutral-800">
        Profile
      </h1>

      
      <div className="max-w-xl mx-auto border">

        {saved && (
          <h2 
            className="text-center bg-green-700 rounded-md
              border-violet-400 
              shadow-md shadow-fuchsia-700
              mb-10
            "
          >
            Le profile à bien été mise à jour!
          </h2>
        )}

        {isSaving && (
          <h2 
            className="text-center bg-zinc-600 rounded-md
              border-violet-400 
              shadow-md shadow-fuchsia-700
              mb-10
            "
          >
            Modification en cours...
          </h2>
        )}


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

          <form 
            className="grow"
            onClick={handleProfileInfoUpdate}
            >
            <input 
              type="text" 
              placeholder="Nom et prenom" 
              className=""
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input type="email" value={session.data?.user?.email} disabled />
            <button className="m-0 p-0 h-10  whitespace-nowrap" type="submit">Enregister</button>
          </form>
        </div>
      
      </div>


    </section>
  )
}

export default ProfilePage