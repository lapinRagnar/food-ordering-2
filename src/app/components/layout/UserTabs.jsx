import Link from "next/link"

const UserTabs = ({admin}) => {
  return (
    
    <div className="flex justify-center gap-4 tabs">

        <Link className={"active"} href={'/profile'}>Profile</Link>

        {admin && (
        <>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'/menu-items'}>Listes de Menu</Link>
            <Link href={'/users'}>Utilisateurs</Link>
        </>
        )}

    </div>

  )
}

export default UserTabs