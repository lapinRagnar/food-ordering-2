"use client"

import { useState } from "react"
import { FaGoogle } from "react-icons/fa"

const RegisterPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [creatingUser, setCreatingUser] = useState(false)
  const [userCreated, setUserCreated] = useState(false)

  const handleFormSubmit = async (ev) => {
    ev.preventDefault()

    console.log("dans on submit")

    setCreatingUser(true)

    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setCreatingUser(false)

  }


  return (
    <section className="my-[100px] ">
      
      <h1 className="text-center mb-10 text-5xl text-primary">S&apos;enregister</h1>

      <form 
        className="bloc max-w-sm mx-auto"
        onSubmit={handleFormSubmit}  
      >

        <input 
          type="email" 
          placeholder="example@example.com" 
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          disabled={creatingUser}  
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          disabled={creatingUser}
        />
        
        
        <button 
          className="flex items-center justify-center h-10 hover:bg-transparent" 
          type="submit"
          disabled={creatingUser}
        >
          Créer un compte
        </button>
        
        <div className="my-2 text-gray-500 text-center">ou</div>

        <div className=" text-gray-500 text-center">

        </div>
        <button className="flex items-center justify-center gap-2 m-0 hover:text-red-400">
          <FaGoogle className="bg-transparent " size={40}/>
          <p>se connecter avec google</p>
        </button>


      </form>

    </section>
  )
}

export default RegisterPage