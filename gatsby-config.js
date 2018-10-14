module.exports = {
  siteMetadata: {
    title: 'Algorithmic Art Sketchbook',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`
    },
    'gatsby-plugin-offline',
    'gatsby-mdx'
  ],
}
