import { graphql , Link } from 'gatsby'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { getCurrentLangKey } from 'ptz-i18n';
import { groupBy } from 'lodash-es';
import { useTranslation } from 'react-i18next'
import { Layout as AntLayout, Menu, Tooltip, Affix, Tag } from 'antd'
import Article from '../components/article'
import {
    EditOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    VerticalAlignTopOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
  } from '@ant-design/icons';
import * as styles from './markdown.module.less'

export const getGithubSourceUrl = ({
    githubUrl,
    relativePath,
    prefix,
  }: {
    githubUrl: string;
    relativePath: string;
    prefix: string;
  }): string => {
    // https://github.com/antvis/x6/tree/master/packages/x6-sites
    if (githubUrl.includes('/tree/master/')) {
      return `${githubUrl.replace(
        '/tree/master/',
        '/edit/master/',
      )}/${prefix}/${relativePath}`;
    }
    return `${githubUrl}/edit/main/site/${prefix}/${relativePath}`;
  };

const getMenuItemlocaleKey = (slug: string = '') => {
    const slugPieces = slug.split('/');
    const menuItemlocaleKey = slugPieces
      .slice(slugPieces.indexOf('docs') + 1)
      .filter(key => key)
      .join('/');
    return menuItemlocaleKey;
  };
  
  const getDocument = (docs: any[], slug: string = '') => {
    return docs.find(doc => doc.slug === slug) || {};
  };
  

const renderMenuItems = (edges: any[]) =>
  edges.map((edge: any) => {
    const {
      node: {
        frontmatter: { title },
        fields: { slug },
      },
    } = edge;
    return (
      <Menu.Item key={slug}>
        <Link to={slug}>{title}</Link>
      </Menu.Item>
    );
  });

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  path,
}: {
  data: any
  path: string
}) {
  const { markdownRemark, allMarkdownRemark , site} = data // data.markdownRemark holds our post data
  const {
    siteMetadata: {

         githubUrl ,
      languages: { langs, defaultLangKey, },
      docs,
    },
  } = site;
  const { t, i18n } = useTranslation();
  const {
    frontmatter,
    html,
    tableOfContents,
    fields: { slug, readingTime },
    parent: { relativePath },
  } = markdownRemark
  const { edges = [] } = allMarkdownRemark;
  const groupedEdges = groupBy(edges, ({ node: { fields: { slug } } }: any) =>
  slug
    .split('/')
    .slice(0, -1)
    .join('/'),
);
const currentLangKey = getCurrentLangKey(langs, defaultLangKey, path);
const [openKeys, setOpenKeys] = useState<string[]>(Object.keys(groupedEdges));

const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
useEffect(() => {
  setCurrentLanguage(i18n.language);
}, [i18n.language]);
  return (
    <>
      <AntLayout style={{ background: '#fff' }}>
        <AntLayout.Sider width={280} theme="light">
        <Menu
            mode="inline"
            selectedKeys={[slug]}
            style={{ height: '100%' }}
            openKeys={openKeys}
            onOpenChange={openKeys => setOpenKeys(openKeys)}
          >
            {Object.keys(groupedEdges)
              .filter(key => key.startsWith(`/${currentLangKey}/`))
              .sort((a: string, b: string) => {
                const aKey = getMenuItemlocaleKey(a);
                const bKey = getMenuItemlocaleKey(b);
                const aDoc = getDocument(docs, aKey);
                const bDoc = getDocument(docs, bKey);
                if (aDoc && bDoc) {
                  return aDoc.order - bDoc.order;
                }
                return 0;
              })
              .map(slug => {
                // if (!shouldBeShown(slug, path)) {
                //   return null;
                // }
                const slugPieces = slug.split('/');
                if (slugPieces.length <= 4) {
                  return renderMenuItems(groupedEdges[slug]);
                } else {
                  const menuItemlocaleKey = getMenuItemlocaleKey(slug);
                  const doc = getDocument(docs, menuItemlocaleKey);
                  return (
                    <Menu.SubMenu
                      key={slug}
                      title={
                        doc && doc.title
                          ? doc.title[currentLangKey]
                          : menuItemlocaleKey
                      }
                    >
                      {renderMenuItems(groupedEdges[slug])}
                    </Menu.SubMenu>
                  );
                }
              })}
          </Menu>
        </AntLayout.Sider>
        <Article className={styles.markdown}>
          <Affix>
            <div
              className={styles.toc}
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            />
          </Affix>
          <div className={styles.main}>
            <h1>
              {frontmatter.title}
              <Tooltip title={t('在 GitHub 上编辑')}>
                <a
                  href={getGithubSourceUrl({
                    githubUrl,
                    relativePath,
                    prefix: 'docs',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.editOnGtiHubButton}
                >
                  <EditOutlined />
                </a>
              </Tooltip>
            </h1>
            <div>
              <Tag>
                {currentLanguage === 'zh'
                  ? moment(readingTime.time).format('阅读时间约 M 分钟')
                  : readingTime.text}
              </Tag>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </Article>
      </AntLayout>
    </>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    site {
        siteMetadata {
          githubUrl
          title
          languages {
            langs
            defaultLangKey
          }
          docs {
            slug
            title {
              zh
              en
            }
            order
          }
        }
      }
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      tableOfContents
      fields {
        slug
        langKey
        readingTime {
          text
          time
        }
      }
      frontmatter {
        title
      }
      parent {
        ... on File {
          relativePath
        }
      }
    }
    allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
              langKey
            }
            frontmatter {
              title
            }
          }
        }
      }
  }
`
