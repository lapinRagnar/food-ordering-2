"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import {toast} from "sonner"
import UserTabs from '@/app/components/layout/UserTabs'
import UserForm from '@/app/components/layout/UserForm'



const ProfilePage = () => {
  
  const [user, setUser] = useState(null)

  const session = useSession()
  console.log("la session dans profile page", session)
  const {status} = session
  // const { update } = session



  const [admin, setAdmin] = useState(false)


  useEffect(() => {

    if (status === 'authenticated') {

      fetch('/api/profile')
        .then(response => {

          response.json().then(data => {
            console.log("data dans le fetch", data)
            setUser(data)
            setAdmin(data?.admin)

          })
        })
    } 
    
  }, [status, session])



  if (status === 'loading') {
    return <div 
        className="
          h-screen w-full
          text-3xl
        "
        >
          <div 
            className="
              text-orange-800
              font-bold
              top-1/3 left-1/2 absolute transform -translate-x-1/2"
            >
            Chargement en cours...
          </div>
        </div>
  }

  if (status === 'unauthenticated') {
    return redirect('/login')
  }

  // const userImage = session.data?.user?.image

  const handleProfileInfoUpdate = async (ev, data) => {
    
    ev.preventDefault()

    toast('Mise à jour en cours...')

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })


    if (response.ok) {
      toast.success('Mise à jour terminé!')
    } else {
      toast.error("Une erreur est survenue, aieuuuuh!")
    }

  }

  
  return (

    <section 
      className="
        min-h-[650px]
      ">

      <UserTabs 
        admin={admin}
      />

     
      <div 
        className="
          max-w-[600px] mx-auto  
          bg-[#4e9b65] 
          p-2
          shadow-lg shadow-slate-600
          bg-gradient-to-r from-green-200 via-green-400 to-purple-700
          rounded-sm
        "
      >

        <UserForm 
          user={user}
          onSave={handleProfileInfoUpdate}
        />
      
      </div>

    </section>
  )
}

export default ProfilePage