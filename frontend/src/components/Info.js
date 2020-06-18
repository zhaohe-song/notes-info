import React from 'react'

const Info = ({ data }) => {
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow">
        <a href={data.url}>
          <img src={data.urlToImage} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Info
