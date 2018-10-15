import React from 'react'

import ShapingFunction from './content/Shaping-Functions.mdx'
import NextLink from '../components/NextLink'

export default () => (
  <div className="center" style={{ marginTop: 5, padding: 20, flexDirection: "column" }}>
    <div id="content" style={{ textAlign: "justify" }}>
      <ShapingFunction />
    </div>
    <NextLink to="Shapes" />
  </div>
)