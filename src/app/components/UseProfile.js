import { useState, useEffect } from "react"

export const useProfile = () => {


  const [data, setData] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    setLoading(true)

    fetch('/api/profile')
      .then(response => {

        response.json().then(data => {
          console.log("fetch dans categories", data)
          setData(data)
          setLoading(false)
        })
        
      })
  
  }, [])

  return {data, loading}
}

