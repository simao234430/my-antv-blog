import { graphql } from 'gatsby'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Layout as AntLayout, Menu, Tooltip, Affix, Tag } from 'antd';
import Article from '../components/article';
import * as styles from './markdown.module.less';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  path,
}: {
  data: any
  path: string
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const {
    frontmatter,
    html,
    tableOfContents,
    fields: { slug, readingTime },
    parent: { relativePath },
  } = markdownRemark
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  return (
    <>
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
            <Tooltip title="在 GitHub 上编辑">
              <a
                // href={`${packageJson.repository.url}/edit/master/${relativePath}`}
                target="_blank"
                className={styles.editOnGtiHubButton}
              >
                {/* <Icon type="edit" /> */}
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
    </>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
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
  }
`
