import React from 'react'
import { Link } from 'gatsby'

export default ({ to }) => (
  <div id="next-section">
    <Link to={to}>NEXT SECTION: "{to.toUpperCase()}" →</Link>
  </div>
)