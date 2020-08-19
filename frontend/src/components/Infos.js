import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Info from './Info'
import Spinner from './Spinner'

const Infos = () => {
  const [info, setInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchInfos() {
      // United States technology news API
      const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=e210ca838b594cbfad72b49add8b3beb')
      setInfo(res.data.articles)
      setIsLoading(false)
    }
    fetchInfos()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="row">
      {info.map(data => <Info key={data.publishedAt} data={data} />)}
    </div>
  )
}

export default Infos
