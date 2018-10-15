import React from 'react'

import About from './content/About.mdx'
import NextLink from '../components/NextLink'

export default () => (
  <div className="center" style={{ marginTop: 5, padding: 20, flexDirection: "column" }}>
    <div id="content" style={{ textAlign: "justify" }}>
      <About />
    </div>
    <NextLink to="Shaping-Functions" />
  </div>
)