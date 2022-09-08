const path = require('path');

module.exports = {
    siteMetadata: {
        title: `AntV`,
        githubUrl: 'https://github.com/antvis/gatsby-theme-antv',
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