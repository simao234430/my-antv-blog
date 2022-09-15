module.exports = {
    siteMetadata: {
        title: `AntV`,
        siteUrl: `https://antvis.github.io`,
        description: `Ant Visualization solution home page`,
        languages: {
          langs: ['en', 'zh'],
          defaultLangKey: 'zh',
        },
        navs: [
            {
              slug: 'docs/specification/getting-started',
              title: {
                zh: '设计语言',
                en: 'Specification',
              },
            },
            {
              slug: 'docs/api',
              title: {
                zh: 'API 文档示例',
                en: 'API docs',
              },
            },
            {
              slug: 'examples',
              title: {
                zh: '图表示例',
                en: 'Examples',
              },
            },
            {
              slug: 'independent',
              title: {
                zh: '独立',
                en: 'MyApp',
              },
              // target: '_blank',
            },
          ],
        docs: [
            {
              slug: 'specification',
              title: {
                zh: '设计语言',
                en: 'Specification',
              },
              order: 0,
              redirect: 'getting-started',
            },
            {
              slug: 'specification/category',
              title: {
                zh: '分类一',
                en: 'category1',
              },
              order: 1,
            },
            {
              slug: 'other',
              title: {
                zh: '其他文档',
                en: 'other',
              },
              order: 0,
              redirect: 'getting-started',
            },
            {
              slug: 'other/category',
              title: {
                zh: '分类二',
                en: 'category2',
              },
              order: 2,
            },
          ],
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