"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

const UserTabs = ({admin}) => {

  const path = usePathname()

  return (
    
    <div className="flex justify-center gap-4 tabs">

        <Link 
          className={path==='/profile' ? 'active' : ''} 
          href={'/profile'}
        >
          Profile
        </Link>

        {admin && (
        <>
          <Link 
            href={'/categories'}
            className={path==='/categories' ? 'active' : ''} 
          >
            Categories
          </Link>

          <Link 
            href={'/menu-items'}
            className={path.includes('/menu-items') ? 'active' : ''} 
          >
            Listes de Menu
          </Link>

          <Link 
            href={'/users'}
            className={path.includes('/users') ? 'active' : ''} 
          >
            Utilisateurs
          </Link>

          <Link 
            href={'/orders'}
            className={path==='/orders' ? 'active' : ''} 
          >
            Commandes
          </Link>
        </>
        )}

    </div>

  )
}

export default UserTabs