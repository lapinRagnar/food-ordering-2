import Image from "next/image"
import Right from "../icons/Right"


const Hero = () => {
  return (
    <section className="grid grid-rows-2 sm:grid-cols-3 p-5 max-h-[700px] gap-5">
      
      <div className="sm:col-span-1 sm:pt-[100px]">
        <h1 className="sm:text-6xl text-5xl font-bold font-weight-900">
          La <br /> 
          Meilleure <span className="text-red-800">Pizza</span> <br />
          De La Planète
        </h1>

        <p className="my-4 text-gray-500 text-sm">
          Découvrez l&apos;harmonie parfaite entre une pâte moelleuse et des ingrédients frais soigneusement sélectionnés, dans notre pizza débordante de saveurs italiennes authentiques. Laissez-vous séduire par chaque bouchée croustillante et fondante, et vivez une expérience culinaire inoubliable avec notre pizza artisanale
        </p>

        <div className="flex gap-4  transition-all ease-in duration-300">
          <button className=" bg-primary flex gap-2  text-white px-4 py-2 rounded-sm">
            <div className="bg-primary">Commander</div>
            <Right  />
          </button>
          <button className="flex gap-2 px-4 py-2 rounded-sm text-gray-300">
            En savoir plus
            <Right className="w6 h-6  text-gray-300"/>
          </button>
        </div>
      </div>

      <div className="sm:col-span-2 w-full  mt-5 ">
        <Image 
          className="rounded-lg w-full"
          src={'/pizza1.jpg'}
          alt="pizza"
          width={"800"}
          height={"200"}       
        />
      </div>

    </section>
  )
}

export default Hero