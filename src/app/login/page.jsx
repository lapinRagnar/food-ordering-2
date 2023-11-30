"use client"

import {signIn, useSession } from "next-auth/react"

import { useRouter, redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { useEffect, useState } from "react"
import { FaGoogle } from "react-icons/fa"

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLogin, setIsLogin] = useState(true)

  const router = useRouter()

  const { data: session, status: sessionStatus } = useSession()
  console.log("la session dans login page", session)

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/profile")
    }
  }, [sessionStatus, router])



  const handleFormSubmit = async (ev) => {
    
    ev.preventDefault()

    console.log("dans on login")


    setIsLogin(true)

    try {
      // const connection = await signIn('credentials', {email, password, callbackUrl: '/'})
      // const res = await signIn('credentials', {email, password,  redirect: false, callbackUrl: '/'})

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("res dans login page handleformsubmit = ", res)

      if (res.ok) {
        // router.replace('/profile')
        // router.push('/')
        // router.refresh()

        return router.push('/')
      }

    }  catch (error) {
      console.log("error dans login page handleformsubmit = ", error)
    }

    setIsLogin(false)


  }


  return (

    <section className="my-[100px] ">
      
      <h1 className="text-center mb-5 text-5xl text-primary font-bold font-weight-900 uppercase from-neutral-800">Se connecter</h1>


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
        <button
          type="button" 
          className="flex items-center justify-center gap-2 m-0 hover:text-red-400"
          /* onClick={() => signIn('google', {redirect: true, callbackUrl: '/'})} */
          onClick={() => signIn('google', {callbackUrl: '/'})}
        >
          <FaGoogle className="bg-transparent " size={40}/>
          <p>se connecter avec google</p>
        </button>

      </form>

    </section>
  )
}

export default LoginPage