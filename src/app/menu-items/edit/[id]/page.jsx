"use client"

import { useProfile } from "@/app/components/UseProfile.js"
import UserTabs from "@/app/components/layout/UserTabs"
import { toast } from 'sonner'

import MenuItemForm from '@/app/components/layout/MenuItemForm'

import { useEffect, useState, } from "react"
import Link from "next/link"

import Left from "@/app/components/icons/Left"
import { redirect, useParams } from "next/navigation"

const EditMenuItemPage = () => {

  const {data: profileData, loading: profileLoading} = useProfile()


  // const [imageId, setImageId] = useState('')
  // const [name, setName] = useState('')
  // const [basePrice, setBasePrice] = useState(0)
  // const [description, setDescription] = useState('')

  const [menuItem, setMenuItem] = useState(null)

  const [redirectToItems, setRedirectToItems] = useState(false)

  const {id} = useParams()


  useEffect(() => {

    fetch('/api/menu-items').then(res => {

      res.json().then(items => {
        const item = items.find(i => i._id === id)
        console.log('item', item);
        
        // setImageId(item.imageId)
        // setName(item.name)
        // setBasePrice(item.basePrice)
        // setDescription(item.description)

        setMenuItem(item)
      })

    })

  }, [id])


  const handleFormSubmit = async (e, data) => {

    e.preventDefault()

    data = {...data, _id: id} 

    toast(' Modification en cour...')

    const response = await fetch('/api/menu-items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })


    if (response.ok) {
      toast.success('Menu modifié!')
    } else {
      toast.error("Une erreur est survenue, aie aieuuuuh!")
    }


    setRedirectToItems(true)

  }


  if (redirectToItems) {
    return redirect('/menu-items')
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
    
    <section 
    className="min-h-[600px] mb-10"
    >

      <UserTabs 
        admin={true}      
        className='mb-5'
      />

      <h1 className="
        my-4
        text-center 
        text-5xl text-primary 
        font-bold font-weight-900 uppercase from-neutral-800">
        Modifier un Menu
      </h1>

      <div className="flex items-center justify-center mb-3">
        <Link 
          className="button flex items-center justify-center gap-2"
          href="/menu-items"
        > 

          <Left 
            className="bg-transparent w-10" 
          />

          <div className="bg-transparent ">
            Afficer tous les menus
          </div>

        </Link>
      </div>

      <div 
        className="
          max-w-[800px] mx-auto  
          bg-[#4e9b65] 
          p-2
          shadow-lg shadow-slate-600
          bg-gradient-to-r from-green-200 via-green-400 to-purple-700
          rounded-sm
        "
      >

        <MenuItemForm 
          menuItem={menuItem}
          onSubmit={handleFormSubmit}
        />

        <div>
          salut
        </div>


      </div>

  
  </section>


  )


}

export default EditMenuItemPage