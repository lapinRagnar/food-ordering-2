import type {NextAuthOptions} from 'next-auth'
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        console.log("mes credentials", credentials)
        
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

        const user =  {id: 1, email: 'user1@gmail.com', password: 'lapinragnar'}
        
        if (credentials?.username === user.email && credentials?.password === user.password) {
          return user
        }


        return null
      }
    })
  ],
  pages: {
    signIn: '/api/login',

  }
}

