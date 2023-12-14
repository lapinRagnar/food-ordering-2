'use client'

import { useEffect, useState } from "react"
import { useProfile } from "../components/UseProfile"
import UserTabs from "../components/layout/UserTabs"
import Link from "next/link"

const UsersPage = () => {

  const [users, setUsers] = useState([])
  const {data: profileData, loading: profileLoading} = useProfile()


  useEffect(() => {
    fetch('/api/users').then(response => {
      response.json().then(users => {
        setUsers(users)
      })
    })
  }, [])

  console.log('users', users)



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
    <section className="mt-8 min-h-[500px] max-w-2xl mx-auto">
      
      <UserTabs admin={true} />

      <div>

        {users?.length > 0 && users.map(user => (
          <div
            key={user._id}
            className="bg-pink-950 rounded-lg mb-4 p-2 flex items-center gap-2"
          >
            <div className="grid grid-cols-4 gap-2 items-center grow">
              <div className="text-gray-600">
                {!!user.name && (<span>{user.name}</span>)}
                {!user.name && (<span className="italic text-xs col-span-3">Pas de nom</span>)}
              </div>
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div>
              <Link 
                href={`/users/${user._id}`} 
                className="bg-transparent p-2"
              >
                Editer
              </Link>
            </div>
          </div>
        ))}


      </div>
      
    </section>
  )
}

export default UsersPage