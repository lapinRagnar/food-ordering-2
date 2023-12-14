'use client'

import { useProfile } from "@/app/components/UseProfile"
import UserForm from "@/app/components/layout/UserForm"
import UserTabs from "@/app/components/layout/UserTabs"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const EditUserPage = () => {
  
  const {data: profileData, loading: profileLoading} = useProfile()
  const [user, setUser] = useState(null)

  const {id} = useParams()
  console.log('edit user id', id)

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then(res => {
      res.json().then(user => {

        setUser(user)
      })
    })
  }, [])

  const handleSaveButtonClick = (e, data) => {
    e.preventDefault()
    fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...data, _id: id})
    })
  }


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
    
    <section className="mt-8 min-h-[580px] max-w-2xl mx-auto">

      <UserTabs admin={true} />

      <div 
        className="
          min-w-[800px] mx-auto  
          bg-[#4e9b65] 
          p-2
          shadow-lg shadow-slate-600
          bg-gradient-to-r from-green-200 via-green-400 to-purple-700
          rounded-sm
        "
      >

        <UserForm
          user={user}
          onSave={handleSaveButtonClick}
        />

      </div>

    </section>
  )
}

export default EditUserPage