module.exports = {
    siteMetadata: {
        title: `AntV`,
        siteUrl: `https://antvis.github.io`,
        description: `Ant Visualization solution home page`,
        languages: {
          langs: ['en', 'zh'],
          defaultLangKey: 'zh',
        },
    },
    plugins: [
      {
        resolve: "gatsby-antv-blog",
        options: {
            contentPath: "events",
            basePath: "/events",
          },
      },

    ],
  }