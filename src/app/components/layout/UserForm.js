'use client'

import { useEffect, useState } from "react"
import EditableImage from "@/app/components/layout/EditableImage"

const UserForm = ({user, onSave}) => {

  const [userName, setUserName] = useState(user?.name || '')

  const [imageId, setImageId] = useState(user?.imageId || 'food-ordering/cwmczdlxbyv9yml8uqwv')

  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [city, setCity] = useState(user?.city || '')
  const [postalCode, setPostalCode] = useState(user?.postalCode || '')


  useEffect(() => {
    setUserName(user?.name || '')
    setImageId(user?.imageId || 'food-ordering/cwmczdlxbyv9yml8uqwv')
    setPhone(user?.phone || '')
    setAddress(user?.address || '')
    setCity(user?.city || '')
    setPostalCode(user?.postalCode || '')
  }, [user])


  return (
    
    <div className="flex gap-8 mt-2 p-10 rounded-sm">
          
      <div>
        <EditableImage imageId={imageId} setImageId={setImageId}/>     
      </div>

      <form 
        className="grow"
        onClick={(e) => onSave(e, {
          name: userName,
          imageId: imageId,
          address: address,
          city: city,
          postalCode: postalCode,
          phone: phone
        })}
        >
        <input 
          type="text" 
          placeholder="Nom et prenom" 
          className=""
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input type="email" value={user?.email} disabled />

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

  )
}

export default UserForm