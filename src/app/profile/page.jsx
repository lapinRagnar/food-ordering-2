"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

import { CldUploadButton } from 'next-cloudinary'
import { CldImage } from 'next-cloudinary'
import InfoBox from "../components/layout/InfoBox"
import SuccessBox from "../components/layout/SuccessBox"
import {toast} from "sonner"
import Link from "next/link"

import UserTabs from '@/app/components/layout/UserTabs'
import EditableImage from "../components/layout/EditableImage"

const ProfilePage = () => {
  

  const session = useSession()

  console.log("la session dans profile page", session)

  
  const imageParDefaut = session.data?.user?.imageId

  const {status} = session
  // const { update } = session

  const [userName, setUserName] = useState('')

  const [imageId, setImageId] = useState('food-ordering/cwmczdlxbyv9yml8uqwv')

  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const [admin, setAdmin] = useState(false)


  useEffect(() => {
    if (status === 'authenticated') {

      fetch('/api/profile')
        .then(response => {

          response.json().then(data => {
            console.log("data dans le fetch", data)
            setUserName(data?.name)
            setImageId(data?.imageId)
            setPhone(data?.phone)
            setAddress(data?.address)
            setCity(data?.city)
            setPostalCode(data?.postalCode)
            setAdmin(data?.admin)

          })
        })


    } 
  }, [status, session, imageParDefaut])

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

  const handleProfileInfoUpdate = async (ev) => {
    
    ev.preventDefault()

    toast('Mise à jour en cours...')

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        imageId: imageId,
        address: address,
        city: city,
        postalCode: postalCode,
        phone: phone,
        admin: admin
      })
    })


    if (response.ok) {
      toast.success('Mise à jour terminé!')
    } else {
      toast.error("Une erreur est survenue, aieuuuuh!")
    }

  }


/*   const uploadCloudinary = (result) => {
    
    toast.success('Téléchargement...')

    setImageId(result.info.public_id)

    toast.success('teléchargement terminé!')
  } */

  
  return (
    <section 
      className="
        min-h-[650px]
      ">

      <UserTabs 
        admin={admin}
      />


      <h1 className="
        my-4
        text-center 
        text-5xl text-primary 
        font-bold font-weight-900 uppercase from-neutral-800">
        Profile
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

        <div className="flex gap-8 mt-2 p-10 rounded-sm">
          
          <div>
            {/* <div className="bg-gray-700 p-2 rounded-lg flex flex-col items-center justify-center">

              { imageId && (
                <CldImage
                  width="100"
                  height="100"
                  src={imageId}
                  sizes="100vw"
                  alt="mon image"
                  className="rounded-full mb-3"
                />
                
              )}

              <form>
              
                  <CldUploadButton
                  className="
                    m-0 p-0 text-gray-200 
                    hover:text-green-500 hover:text-lg 
                    whitespace-nowrap
                    bg-transparent
                    cursor-pointer
                    "  
                    uploadPreset="hwawxrhz"
                    onUpload={uploadCloudinary}

                  >
                    Modifier
                  </CldUploadButton>

              </form>
            </div> */}

            <EditableImage imageId={imageId} setImageId={setImageId}/>
            
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

            <input 
              type="text" 
              placeholder="Adresse" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex gap-6">
              <input 
                type="text" 
                placeholder="Ville" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input 
                type="text" 
                placeholder="Code postal" 
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />

            </div>

            <input 
              type="tel" 
              placeholder="Téléphone" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />


            <button className="m-0 p-0 h-10  whitespace-nowrap" type="submit">Enregister</button>

          </form>
        </div>
      
      </div>

    </section>
  )
}

export default ProfilePage