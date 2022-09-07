const path = require('path');

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-i18n',
            options: {        
              langKeyDefault: 'en',
              useLangKeyLayout: false
            }
          },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `docs`,
            path: path.resolve('./docs'),
            ignore: [`**/\.*`],
        },
    },
    {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: []
        }
    },
    {
        resolve: `gatsby-plugin-typescript`,
        options: {
          isTSX: true, // defaults to false
          jsxPragma: `jsx`, // defaults to "React"
          allExtensions: true, // defaults to false
        },
      },
    ],
  }