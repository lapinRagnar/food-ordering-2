import Hero from "./components/layout/Hero.jsx"
import HomeMenu from "./components/layout/HomeMenu.jsx"
import SectionHeaders from "./components/layout/SectionHeaders.jsx"

import { GiRotaryPhone } from "react-icons/gi"


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />

      <section className="text-center my-[70px]">
        <SectionHeaders 
          subHeader={'Notre Histoire'}
          mainHeader={'A propos'}
        />

        <div className="max-w-3xl mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Dans un coin tranquille d&apos;une rue étroite, une modeste boutique de pizzas ouvrait ses portes. Tenue par une famille passionnée, elle cuisinait avec amour des pizzas aux saveurs authentiques et aux ingrédients frais. La réputation de cette pizzeria, transmise de bouche à oreille, attira des amateurs de pizza venant des quatre coins du monde. Avec le temps, la file d&aposattente sattente s&aposallongeait, les médias s&aposintéressaient à leur histoire, et la petite boutique devint rapidement une attraction incontournable.
          </p>
          <p>
            Ce qui avait commencé comme un humble rêve culinaire était désormais un empire de la pizza, avec des franchises dans les grandes villes du monde. Pourtant, malgré cette renommée mondiale, l&aposessence demeurait la même : des recettes traditionnelles, un service chaleureux et une passion inébranlable pour l&aposart de créer la meilleure pizza. 
          </p>

          <p>
          Chaque bouchée était un hommage à leur humble début, une célébration de l&aposauthenticité qui avait conquis les cœurs et les papilles des amateurs de pizza partout sur la planète.
          </p>
        </div>
      </section>

      <section className="text-center my-[70px]">

        <SectionHeaders 
          subHeader={'Pour plus d\'informations'}
          mainHeader={'Contacter nous!'}
        />

        <div className="flex justify-center items-center my-3"> 
          <GiRotaryPhone color="red" size={35}/>  
          <div className="text-gray-500 font-bold ml-3 text-3xl">
            +33 6 00 00 00 00
          </div>
        </div>

      </section>

      <footer className="border-t p-8 text-center text-gray-500 ">
        &Copy; 2023@tous les droits réservés
      </footer>

    </>
  )
}
