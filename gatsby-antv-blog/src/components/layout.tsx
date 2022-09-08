import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getCurrentLangKey } from 'ptz-i18n'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import Header from './header'
import Footer, { OLD_SITE_DOMAIN } from './Footer';
import { FooterProps } from 'rc-footer';
import locale from '../../locale.json'

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
          githubUrl
          title
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
        githubUrl,
        title,
        languages: { langs, defaultLangKey },
        docs,
      },
    },
  } = data

  const currentLangKey = getCurrentLangKey(
    langs,
    defaultLangKey,
    location!.pathname
  )

  useEffect(() => {
    if (i18n.language !== currentLangKey) {
      i18n.changeLanguage(currentLangKey)
    }
  }, [currentLangKey])
  return (
    <main>
      <Header location={location} currentLangKey={currentLangKey} docs={[]} />
      {children}
      <Footer
          githubUrl={githubUrl}
          rootDomain="https://antv.vision"
          location={location}
          {...footerProps}
        />
    </main>
  )
}
export default Layout
