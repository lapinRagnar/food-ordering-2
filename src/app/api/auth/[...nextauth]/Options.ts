import { User } from '@/app/models/User'
import type {NextAuthOptions} from 'next-auth'

import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Ton email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        console.log("mes credentials", credentials)

        const { email, password } = credentials

        mongoose.connect(process.env.MONGO_URL)
        const user = await User.findOne({ email })
        
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        if (passwordOk) {
          return user
        }

        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
  
        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }
        // Return null if user data could not be retrieved




        return null
      }
    })
  ],
  pages: {
    signIn: '/api/login',

  }
}

