import React from 'react'

import Intro from './content/Introduction.mdx'

export default function Introduction(props) {
  return (
    <div className="center" style={{ flexDirection: 'column'}}>
      <h1 className="heading">Shader World</h1>
      <div className="intro" id="content">
        <Intro />
        <div className="center">
        <a href="" id="explore-link">Explore &rarr;</a>
        </div>
      </div>
    </div>
  )
}