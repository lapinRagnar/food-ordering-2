'use client'

import { useProfile } from "@/app/components/UseProfile"
import UserTabs from "@/app/components/layout/UserTabs"

const EditUserPage = () => {
  
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
    
    <section className="mt-8 min-h-[500px] max-w-2xl mx-auto">

      <UserTabs admin={true} />

      <div>salut</div>

    </section>
  )
}

export default EditUserPage