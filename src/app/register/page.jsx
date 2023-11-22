import { FaGoogle } from "react-icons/fa"

const RegisterPage = () => {
  return (
    <section className="my-[100px] ">
      
      <h1 className="text-center mb-10 text-5xl text-primary">S&apos;enregister</h1>

      <form className="bloc max-w-sm mx-auto">

        <input type="email" placeholder="example@example.com" />
        <input type="password" placeholder="Mot de passe" />
        <button className="flex items-center justify-center h-10 hover:bg-transparent" type="submit">Créer un compte</button>
        <div className="my-2 text-gray-500 text-center">ou</div>

        <div className=" text-gray-500 text-center">

        </div>
        <button className="flex items-center justify-center gap-2 m-0 hover:text-red-400">
          <FaGoogle className="bg-transparent " size={40}/>
          <p>se connecter avec google</p>
        </button>


      </form>

    </section>
  )
}

export default RegisterPage