import React from 'react'

export default function Introduction(props) {
  return (
    <div className="center" style={{ flexDirection: 'column'}}>
      <h1 className="heading">Shader World</h1>
      <div className="intro" id="content" style={{ marginTop: -25 }}>
        <p>An evolving catalogue of shaders based on generative algorithms</p>
      </div>
    </div>
  )
}