import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <ul className='listItems'>
      <li><Link to="/About">About</Link></li>
      <li><Link to="#">Introduction</Link></li>
      <li><Link to="#">Shaping functions</Link></li>
      <li><Link to="#">Drawing shapes</Link></li>
    </ul>
  </Layout>
)

export default IndexPage
