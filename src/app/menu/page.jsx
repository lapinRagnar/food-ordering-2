'use client'

import { useEffect, useState } from "react"
import SectionHeaders from "../components/layout/SectionHeaders"

const MenuPage = () => {

  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories)
      })
    })

    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems)
      })
    })
  }, [])

  console.log('categories', categories)
  console.log('menuItems', menuItems)

  return (
    <section className="mt-5">

      {categories?.length > 0 && categories.map(category => (
        <div
          key={category._id}
        >
          <div className="text-center">
            <SectionHeaders mainHeader={category.name}/>
          </div>

          {menuItems.filter(item => item.category === category._id).map(item => (
            <div key={item._id}>item</div>
          ))}

        </div>
      ))}

    </section>
  )
}

export default MenuPage