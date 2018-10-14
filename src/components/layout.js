import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Typography from 'typography'
import githubTheme from 'typography-theme-github'

import './layout.css'

const typography = new Typography(githubTheme)

typography.injectStyles()

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
        >
          <html lang="en" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Helmet>
        <div className="center" style={{ marginTop: 10, flexDirection: "column" }}>
          <h2>{data.site.siteMetadata.title}</h2>
          <div style={{ marginTop: 20 }}>
          {children}
        </div>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
