"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {signIn, useSession } from "next-auth/react"
import {  useRouter } from "next/navigation"
import { FaGoogle } from "react-icons/fa"

const LoginPage = () => {


  const router = useRouter()
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { data: session, status: sessionStatus } = useSession()


  useEffect(() => {


    if (sessionStatus === "authenticated") {
      router.refresh()
      router.replace("/profile")
    }
  }, [sessionStatus, router])



  const handleFormSubmit = async (ev) => {
    
    ev.preventDefault()

    const email = ev.target[0].value
    const password = ev.target[1].value


    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      return emailRegex.test(email)
    }

    if (!isValidEmail(email)) {
      setError("Le mail est invalide!")
      return
    }

    if (!password || password.length < 4) {
      setError("Le mot de passe est invalide!")
      return
    }

    setIsLogin(true)


    // const connection = await signIn('credentials', {email, password, callbackUrl: '/'})
    // const res = await signIn('credentials', {email, password,  redirect: false, callbackUrl: '/'})

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })


    if (res?.ok) {
      
      setError("")
      router.replace("/")
      
    } else {
      setError("Le email ou le mot de passe est incorrect!")
    }

    setIsLogin(false)

  }

  if (sessionStatus === "loading") {
    return <h1 className="flex min-h-screen flex-col items-center justify-start p-24">Chargement en cour...</h1>
  }



  return (
    sessionStatus !== "authenticated" && (

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
          />
          <input 
            name="password"
            type="password" 
            placeholder="Mot de passe" 
          />
          
          
          <button 
            className="flex items-center justify-center h-10 hover:bg-transparent" 
            type="submit"
            disabled={!isLogin}
          >
            Se connecter
          </button>
          
          <div className="my-2 text-gray-500 text-center">ou</div>

          <div className=" text-gray-500 text-center">

          </div>

          <button
            type="button" 
            className="flex items-center justify-center gap-2 m-0 hover:text-red-400"
            /* onClick={() => signIn('google', {redirect: true, callbackUrl: '/'})} */
            onClick={() => signIn('google')}
          >
            <FaGoogle className="bg-transparent " size={40}/>
            <p>se connecter avec google</p>
          </button>

        </form>

      </section>


    )
    
  )
  
}

export default LoginPage