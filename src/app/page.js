import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <Link href="" className="text-red-700 font-bold text-5xl">pizza lapinRagnar</Link>
        <nav>
          <Link href={''}>Accueil</Link>
          <Link href={''}>Menu</Link>
          <Link href={''}>A propos</Link>
          <Link href={''}>A Contact</Link>
          <Link href={''}>A Login</Link>

        </nav>
      </header>
    </>
  )
}
