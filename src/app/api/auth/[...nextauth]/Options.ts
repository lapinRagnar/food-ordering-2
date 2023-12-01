import { User } from '@/app/models/User'
import type {NextAuthOptions} from 'next-auth'

import { Account, User as AuthUser } from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise  from '@/app/libs/mongoConnect'
import clientPromise  from '@/app/libs/mongoConnect'
import connect from "@/utils/db"

import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET as string,
  session: {
    // Set it as jwt instead of database
    strategy: "jwt",

  },
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
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Ton email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {

        console.log("mes credentials dans auth [next auth]", credentials)

        // const { email, password } = credentials
        try {

          await connect()
          const user = await User.findOne({email: credentials.email})
          console.log("mon user dans auth [next auth]", user)
          
         
          if (user) {
            
            const passwordOk = user && bcrypt.compareSync(credentials.password, user.password)
            if (passwordOk) {

              console.log("je verifie le password et retourne le user")
              
              return user
            }
          }
        } catch (err) {
          throw new Error(err)
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

  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        console.log("je suis dans le callback sign in")
        return true;
      }
      if (account?.provider == "google") {
        return true;
      }


      if (account?.provider == "github") {
        await mongoose.connect(process.env.MONGO_URL);
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },


    
  },
  // pages: {
  //   signIn: '/profile',


}

