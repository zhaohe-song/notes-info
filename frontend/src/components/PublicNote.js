import React from 'react'

const PublicNote = ({ note }) => {
  return (
    <div className="col-md-6">
      <div className="card mb-3 shadow">
        <div className="card-body">
          {note.content.split('\n').map((line, index) => <div key={index}>{line}</div>)}
        </div>
      </div>
    </div>
  )
}

export default PublicNote
