"use client"

import { signIn } from "next-auth/react"


import Link from "next/link"
import { useState } from "react"
import { FaGoogle } from "react-icons/fa"

const RegisterPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [creatingUser, setCreatingUser] = useState(false)
  const [userCreated, setUserCreated] = useState(false)

  const [error, setError] = useState(false)

  const handleFormSubmit = async (ev) => {
    ev.preventDefault()

    console.log("dans on submit")

    setCreatingUser(true)
    setError(false)

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      setUserCreated(true)
    } else {
      setError(true)  
      setCreatingUser(false)
    }




    // setCreatingUser(false)
    // setUserCreated(true)

  }


  return (
    <section className="my-[100px] ">
      
      <h1 className="text-center mb-10 text-5xl text-primary">S&apos;enregister</h1>

      {userCreated && (
        <div className="my-4 text-center">
          <p className="bg-green-400 w-[300px] bloc mx-auto p-4 rounded-md ">
            Votre compte a bien été crée ! 
            <Link className="bg-inherit hover:text-red-600 ml-2 border-b-2 border-b-red-400" href="/login">Se connecter</Link>
          </p>
        </div>
      )}

      {error && (
        <div className="my-4 text-center">
        <p className="bg-red-400 w-[300px] bloc mx-auto p-4 rounded-md ">
          Cet utilisateur existe déjà ! 
        </p>
      </div>
      )}

      <form 
        className={`bloc max-w-sm mx-auto ${userCreated ? "hidden" : ""} `}
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
        <button 
          className="flex items-center justify-center gap-2 m-0 hover:text-red-400"
          onClick={() => {signIn('google', {callbackUrl: '/'})}}
        >
          <FaGoogle className="bg-transparent " size={40}/>
          <p>se connecter avec google</p>
        </button>

        <div className="mt-5">
          Vous avez deja un compte ? 
          <Link 
            href="/login"
            className="bg-inherit hover:text-red-600 ml-2 border-b-2 border-b-red-400 "
          >
            Se connecter
          </Link>
        </div>
      </form>

    </section>
  )
}

export default RegisterPage