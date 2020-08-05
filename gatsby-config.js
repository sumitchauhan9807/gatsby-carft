/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/images`,
      },
    },
   {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "CRAFT",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "craft",
        // Url to query from
        url: "http://vlb3.test/api",
        headers: {
          Authorization: 'Bearer q6SEk6sqGvYWqX1qUzyVtggIg-feOIE6',
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
