"use client"

import {signIn} from "next-auth/react"

import { useState } from "react"
import { FaGoogle } from "react-icons/fa"

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLogin, setIsLogin] = useState(true)



  const handleFormSubmit = async (ev) => {
    
    ev.preventDefault()

    console.log("dans on login")


    setIsLogin(true)

    await signIn('credentials', {email, password, callbackUrl: '/'})

    setIsLogin(false)


  }


  return (

    <section className="my-[100px] ">
      
      <h1 className="text-center mb-10 text-5xl text-primary">Se connecter</h1>


      <form 
        className={`bloc max-w-sm mx-auto `}
        onSubmit={handleFormSubmit}  
      >

        <input 
          name="email"
          type="email" 
          placeholder="example@example.com" 
          value={email}
          onChange={ev => setEmail(ev.target.value)}
        />
        <input 
          name="password"
          type="password" 
          placeholder="Mot de passe" 
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        
        
        <button 
          className="flex items-center justify-center h-10 hover:bg-transparent" 
          type="submit"
          disabled={!isLogin}
        >
          Login
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

export default LoginPage