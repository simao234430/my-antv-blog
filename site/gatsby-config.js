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
              // 更新公告
    announcement: {
        zh: '1. 文档更新啦！请前往 API 文档，查看图表组件说明。2. 欢迎大家体验周边生态 Theme-Set 和 vis-dashboard。',
        en: 'Docs updated! Please go to the page of API Docs see the details.',
      },
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