
import { AppProvider  } from './components/AppContext'

import { options } from './api/auth/[...nextauth]/Options'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/utils/SessionProvider'

import { Roboto } from 'next/font/google'
import './globals.css'
import Header from './components/layout/Header'

import { Toaster } from 'sonner'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata = {
  title: 'Commander la bouffe',
  description: 'miam miam miam',
}

export default async function RootLayout({ children}) {

  const session = await getServerSession(options)    


  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-[1400px] mx-auto min-h-[100vh]'>
          
        
          <AppProvider>
            
          
            <SessionProvider session={session}>
          
          
              <Toaster 
                position='top-right'
                toastOptions={{
                  unstyled: true,
                  classNames: {
                    toast: 'bg-transparent',
                    title: 'text-red-400',
                    description: 'text-red-400',
                    actionButton: 'bg-zinc-400',
                    cancelButton: 'bg-orange-400',
                    closeButton: 'bg-lime-400',
                    error: 'bg-red-400',
                    success: 'text-green-400',
                    warning: 'text-yellow-400',
                    info: 'bg-blue-400',
                  },
                }}  
              /> 
            
              <Header />
            
              {children}
              
              <footer className="border-t p-8 text-center text-gray-500 ">
              &Copy; 2023@tous les droits réservés
              </footer>

            </SessionProvider>    

          </AppProvider>

        
        </main>

      </body>
    </html>
  )
}
