
"use client"


import { useEffect, useState,  } from "react"
import UserTabs from "../components/layout/UserTabs"
import { useProfile } from "../components/UseProfile"

import {toast} from "sonner"

import { useDebouncedCallback } from 'use-debounce'
import DeleteButton from "../components/DeleteButton"

const Categories = () => {

  const [categoryName, setCategoryName] = useState('')
  const [categories, setCategories] = useState([])
  const [editedCategory, setEditedCategory] = useState(null)

  const {data: profileData, loading: profileLoading} = useProfile()

  useEffect(() => {
    fetchCategories()
  }, [])

/*   const fetchCategories = () => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories)
      })
    })
  } */

  const fetchCategories = useDebouncedCallback(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories)
      })
    })
  }, 800)

  const handleCategorySubmit = async (e) => {

    e.preventDefault()

    const data = { name: categoryName }

    if (editedCategory) {
      data._id = editedCategory._id
    }

    if (!editedCategory) {
      toast('Ajout en cours...')
    } else {
      toast('Mise à jour en cours...')
    }


    const response = await fetch('/api/categories', {
      method: editedCategory ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    setCategoryName('')
    fetchCategories()
    setEditedCategory(null)

    if (response.ok) {
      
      if (!editedCategory) {
        toast.success('Categorie bien ajoutée!')
      } else {
        toast.success('Categorie bien mis à jour!')
      }

    } else {
      toast.error("Une erreur est survenue, aieuuuuh!")
    }

  }

  const handleDeleteClick = async (_id) => {
    console.log("_id", _id)

    toast('Suppression en cours...')

    const response = await fetch("/api/categories?_id="+ _id, {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    })

    if (response.ok) {
      toast.success("Categorie bien supprimée!")
      fetchCategories()
      
    } else {
      toast.error("Une erreur est survenue, aieuuuuh!")
    }


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
      className="min-h-[550px]"
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
        Catégories
      </h1>

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

        <form className="px-10 pb-10" onSubmit={handleCategorySubmit}>
          <div className="flex gap-4 justify-center items-center">
            <div className="grow">
              <input 
                type="text" 
                placeholder={editedCategory ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie'}
                // value={editedCategory ? editedCategory.name : categoryName}
                value={categoryName}
                onChange={(ev) => setCategoryName(ev.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="p-2" type="submit">
                { editedCategory ? 'Modifier' : 'Ajouter' }
              </button>
              <button
                type="button" 
                className="p-2 bg-transparent"
                onClick={() => {setEditedCategory(null); setCategoryName('')}}
              >
                Annuler
              </button>
            </div>
          </div>

        </form>

        <div className="px-10 pb-2">
          
          <h1 className="mb-3 text-2xl text-amber-700 font-bold">Editer les catégories</h1>

          {categories.length > 0 && categories.map(c => (
            <div
              className=" flex items-center"
              key={c.name}
            >
              
              <div
                className="grow pl-2"
              >
                {c.name} 
              </div>

              <div className="flex gap-1">
                <button 
                  type="button"
                  onClick={() => {
                    setEditedCategory(c)
                    setCategoryName(c.name)  
                  }} 
                >
                  Editer
                </button>

                <DeleteButton 
                  label={"Effacer"}
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
              
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Categories