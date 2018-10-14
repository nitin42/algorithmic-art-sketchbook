import React from 'react'
import { Link } from 'gatsby'

export default ({ to }) => (
  <div style={{ letterSpacing: 0.5 }}>
    <Link to={to}>NEXT SECTION: "{to.toUpperCase()}" →</Link>
  </div>
)