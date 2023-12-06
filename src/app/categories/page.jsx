
"use client"

import { useState, useEffect } from "react"
import UserTabs from "../components/layout/UserTabs"
import { useProfile } from "../components/UseProfile"


const Categories = () => {

  const {data: profileData, loading: profileLoading} = useProfile()

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
    <section className="min-h-[650px] max-w-6xl mx-auto bg-slate-400">
      
      <UserTabs 
        admin={true}      
        className='mb-5'
      />
      Catégories
    </section>
  )
}

export default Categories