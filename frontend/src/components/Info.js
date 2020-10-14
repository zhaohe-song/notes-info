import React from 'react'

const Info = ({ data }) => {
  const media = data.media
  const image = media.length && media[0]['media-metadata']
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow">
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          <img src={image && image[image.length - 1].url} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Info
