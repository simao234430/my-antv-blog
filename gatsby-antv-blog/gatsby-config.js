const path = require('path');
// const dotenv = require('dotenv').config(
//     {
//         path: `.env`,
//     }
// )
// console.log(dotenv.config.GATSBY_ALGOLIA_APP_ID)

require('dotenv').config({ path: '.env' })

// 使用
console.log(process.env.GATSBY_ALGOLIA_APP_ID) // localhost
// require('dotenv').config({
//     path: `.env`,
//   })
//   const config = dotenv.config()
//   if(config.error){
//     console.log(config)
//     console.log('Could not load env file', config.error)
//   }
// import 'dotenv/config';
// const GATSBY_ALGOLIA_APP_ID = process.env.GATSBY_ALGOLIA_APP_ID

  
module.exports = {
    siteMetadata: {
        title: `AntV`,
        githubUrl: 'https://github.com/simao234430/my-antv-blog',
        siteUrl: `https://antvis.github.io`,
        description: `Ant Visualization solution home page`,
        languages: {
            langs: ['en', 'zh'],
            defaultLangKey: 'zh',
        },
        docs: [],
    },
    plugins: [
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
              appId: process.env.GATSBY_ALGOLIA_APP_ID,
              apiKey: process.env.ALGOLIA_ADMIN_KEY,
              queries: require("./src/utils/algolia-queries")
            },
          },
        {
            resolve: 'gatsby-plugin-i18n',
            options: {
                langKeyDefault: 'en',
                useLangKeyLayout: false
            }
        },

        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: require.resolve(`./src/images/favicon.png`), // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `docs`,
                path: path.resolve('./docs'),
                ignore: [`**/\.*`],
            },
        },
        `gatsby-remark-reading-time`,
        {
            resolve: 'gatsby-plugin-less',
            options: {
                lessOptions: {
                    javascriptEnabled: true,
                  },

            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
              rule: {
                include: /images/, // See below to configure properly
              },
            },
          },
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/layout.tsx`),
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [
                {
                  resolve: `gatsby-remark-prettier`,
                  options: {
                    // Look for local .prettierrc file.
                    // The same as `prettier.resolveConfig(process.cwd())`
                    usePrettierrc: true,
                    // Overwrite prettier options, check out https://prettier.io/docs/en/options.html
                    prettierOptions: {},
                  },
                },
                {
                  resolve: `gatsby-remark-prismjs`,
                  options: {
                    inlineCodeMarker: '±',
                  },
                },
                {
                  resolve: 'gatsby-remark-external-links',
                  options: {
                    target: '_self',
                    rel: 'nofollow',
                  },
                },
                `gatsby-remark-autolink-headers`,
                `gatsby-remark-reading-time`,
              ],
            },
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