import { User } from '@/models/User'
import type {NextAuthOptions} from 'next-auth'


import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise  from '@/app/libs/mongoConnect'
import clientPromise  from '@/libs/mongoConnect'
import connect from "@/utils/db"

import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'


export const options: NextAuthOptions = {

  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET as string,
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

        // const { email, password } = credentials
        await connect()

        try {

          const user = await User.findOne({email: credentials.email})
          
         
          if (user) {

            
            const passwordOk = user && bcrypt.compareSync(credentials.password, user.password)

            if (passwordOk) {
              
              return user
            }
          }
        } catch (err) {
          throw new Error(err)
        }
        

        return null
      }
    })
  ],

  callbacks: {

    session: async ({session}: any) => {

      await connect()
      const user = await User.findOne({email: session.user.email})
      
      session.user.imageId = user?.imageId
      session.user.name = user?.name
      session.user.address = user?.address
      session.user.city = user?.city
      session.user.postalCode = user?.postalCode
      session.user.phone = user?.phone
      session.user.admin = user?.admin


      return session
    }
    
  },
/*   pages: {
    signIn: '/signin',
  } */


}



