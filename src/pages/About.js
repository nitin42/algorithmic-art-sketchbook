import React from 'react'
import {Link} from 'gatsby';

import About from './content/About.mdx'
import NextLink from '../components/NextLink'

export default () => (
  <div className="center" style={{ marginTop: 50, padding: 20, flexDirection: "column" }}>
    <About />
    <NextLink to="Introduction" />
  </div>
)