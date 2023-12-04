import { User } from '@/app/models/User'
import type {NextAuthOptions} from 'next-auth'

import { Account, User as AuthUser } from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise  from '@/app/libs/mongoConnect'
import clientPromise  from '@/libs/mongoConnect'
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

        console.log("mes credentials dans auth [next auth] options", credentials)

        // const { email, password } = credentials
        try {

          await connect()
          const user = await User.findOne({email: credentials.email})
          console.log("mon user dans auth [next auth] options ---- après connection compte", user)
          
         
          if (user) {

            const loggedInUser = {
              id: user._id,
              email: user.email,
              name : user.name,
              imageId: user.imageId,
              token: user.token
            }
            
            const passwordOk = user && bcrypt.compareSync(credentials.password, user.password)

            if (passwordOk) {

              console.log("je verifie le password et retourne le user, le compte a bien été crée!")
              
              return loggedInUser
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

    // async signIn({ user, account }: { user: AuthUser; account: Account }) {
    //   if (account?.provider == "credentials") {
    //     console.log("je suis dans le callback sign in")
    //     return true;
    //   }
    //   if (account?.provider == "google") {
    //     return true;
    //   }


    //   if (account?.provider == "github") {
    //     await mongoose.connect(process.env.MONGO_URL);
    //     try {
    //       const existingUser = await User.findOne({ email: user.email });
    //       if (!existingUser) {
    //         const newUser = new User({
    //           email: user.email,
    //         });

    //         await newUser.save();
    //         return true;
    //       }
    //       return true;
    //     } catch (err) {
    //       console.log("Error saving user", err);
    //       return false;
    //     }
    //   }
    // },

/*     async signIn({, user, account, profile, email, credentials}) {
      console.log({account, profile, email, credentials, user})

      // if (account.type === "oauth") {
      //   return await signInWithOAuth({account, profile, email, credentials})
      // }

      return false
    }, */

    async jwt({ token, trigger, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log('session dans jwt', session)
      console.log('trigger dans  jwt', trigger)
      console.log('token dans jwt', token)

      // if (user) {
      //   token.accessToken = user.token
      //   // token.id = profile?.id
      // }
      return token
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      
      console.log("session dans la session - callback", session)
      console.log("token dans la session - callback", token)
      console.log("user dans la session - callback", user)
      
      session.user = token.user
      
      return session
    }


/*     session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
      },
    }), */

    
  },
/*   pages: {
    signIn: '/signin',
  } */


}


/* ----------------------------------------------------------------------------------------- */
/* async function signInWithOAuth({account, profile, email, credentials}) {
  console.log({account, profile, email, credentials})

  const user = await User.findOne({ email: profile.email })

  if (user) return true //signin


} */
