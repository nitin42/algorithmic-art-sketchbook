import React from 'react'

import Intro from './content/Introduction.mdx'
import Footer from './Footer'

export default function Introduction(props) {
  return (
    <div className="center" style={{ flexDirection: 'column'}}>
      <h1 className="heading">Shader World</h1>
      <div className="intro" id="content" style={{ marginTop: -20 }}>
        <Intro />
        <div className="center">
        <a href="./TruchetTiles" id="explore-link">Explore &rarr;</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}