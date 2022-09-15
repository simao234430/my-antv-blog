import React, { useEffect } from 'react'
import { useStaticQuery, graphql, withPrefix } from 'gatsby'
import { getCurrentLangKey } from 'ptz-i18n'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import Header from './header'
import Footer, { OLD_SITE_DOMAIN } from './Footer';
import { FooterProps } from 'rc-footer';
import locale from '../../locale.json'
import * as styles from './layout.module.less';
import TopBanner from './TopBanner';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: locale,
    lng: 'zh',
    fallbackLng: 'zh',
  })

const Layout: React.FC<any> = ({ children, location, footerProps}) => {
  const { i18n } = useTranslation()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
            navs {
                slug
                title {
                    zh
                    en
                }
            }
          githubUrl
          title
          announcement {
            zh
            en
          }
          languages {
            langs
            defaultLangKey
          }
        }
      }
    }
  `)
  const {
    site: {
      siteMetadata: {
        navs,
        githubUrl,
        announcement,
        title,
        languages: { langs, defaultLangKey },
        docs,
      },
    },
  } = data
  const lngs = ['zh', 'en'];
  const pathPrefix = withPrefix('/').replace(/\/$/, '');
  const path = location.pathname.replace(pathPrefix, '');
  const currentLangKey = getCurrentLangKey(
    langs,
    defaultLangKey,
    location!.pathname
  )

  const isHomePage =
    path === '/' ||
    path === `/${currentLangKey}` ||
    path === `/${currentLangKey}/`;

    const isExamplePage =
    location.pathname.includes('/examples/') &&
    !location.pathname.endsWith('/gallery');


  useEffect(() => {
    if (i18n.language !== currentLangKey) {
      i18n.changeLanguage(currentLangKey)
    }
  }, [currentLangKey])
  return (
    <>
      <Header   navs={navs} location={location} currentLangKey={currentLangKey} docs={[]} />
 
        <TopBanner announcement={announcement} />
 
      <main className={styles.main}>{children}</main>
      <Footer
          githubUrl={githubUrl}
          rootDomain="https://antv.vision"
          location={location}
          {...footerProps}
        />
    </>
  )
}
export default Layout
