import React from 'react'

import Shapes from './content/Shapes.mdx'
import NextLink from '../components/NextLink'

export default () => (
  <div className="center" style={{ marginTop: 5, padding: 20, flexDirection: "column" }}>
    <div id="content" style={{ textAlign: "justify" }}>
      <Shapes />
    </div>
    <NextLink to="Shaders-React" />
  </div>
)