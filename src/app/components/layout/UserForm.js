'use client'

import { useEffect, useState } from "react"
import EditableImage from "@/app/components/layout/EditableImage"
import { useProfile } from "@/app/components/UseProfile"

const UserForm = ({user, onSave}) => {

  const [userName, setUserName] = useState(user?.name || '')

  const [imageId, setImageId] = useState(user?.imageId || 'food-ordering/cwmczdlxbyv9yml8uqwv')

  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [city, setCity] = useState(user?.city || '')
  const [postalCode, setPostalCode] = useState(user?.postalCode || '')

  const [admin, setAdmin] = useState( user?.admin || false)
  const {data: loggedInUserData} = useProfile()


  useEffect(() => {
    setUserName(user?.name || '')
    setImageId(user?.imageId || 'food-ordering/cwmczdlxbyv9yml8uqwv')
    setPhone(user?.phone || '')
    setAddress(user?.address || '')
    setCity(user?.city || '')
    setPostalCode(user?.postalCode || '')
    setAdmin(user?.admin || false)
  }, [user])


  return (
    
    <div className="flex gap-8 mt-2 p-10 rounded-sm">
          
      <div>
        <EditableImage imageId={imageId} setImageId={setImageId}/>     
      </div>

      <form 
        className="grow"
        onSubmit={(e) => onSave(e, {
          name: userName,
          imageId: imageId,
          address: address,
          city: city,
          postalCode: postalCode,
          phone: phone,
          admin: admin
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

        {loggedInUserData?.admin && (
          
          <div className="flex items-center gap-2 mt-8">
            <input 
              type="checkbox" 
              id="admin" 
              name="admin"  
              value={'1'}
              checked={admin}
              onClick={(e) => setAdmin(e.target.checked)}
            />
            <label for="admin">Admin</label>
          </div>
          
        )}


        <button className="m-0 p-3 mt-8 whitespace-nowrap" type="submit">Enregister</button>

      </form>
    </div>

  )
}

export default UserForm