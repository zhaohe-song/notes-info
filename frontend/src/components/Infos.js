import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Info from './Info'
import Spinner from './Spinner'

const Infos = () => {
  const [info, setInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchInfos() {
      // New York Times API
      const res = await axios.get('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=PhRz6WAoeXlnMGINvwA627u8Vgn68ydO')
      setInfo(res.data.results)
      setIsLoading(false)
    }
    fetchInfos()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="row">
      {info.map(data => <Info key={data.id} data={data} />)}
    </div>
  )
}

export default Infos
