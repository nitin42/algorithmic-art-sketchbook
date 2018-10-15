import React from 'react'

import ShapingFunction from './content/Shaping-Functions.mdx'
import NextLink from '../components/NextLink'

export default () => (
  <div className="center" style={{ marginTop: 50, padding: 20, flexDirection: "column" }}>
    <div id="content" style={{ textAlign: "justify" }}>
      <ShapingFunction />
    </div>
    <NextLink to="Shaping-Functions" />
  </div>
)