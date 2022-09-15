import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby'
import { Popover, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import * as styles from './header.module.less'
import Products from './products';
import NavMenuItems, { Nav } from './NavMenuItems';
// import AntvLogo from '../images/antv.svg';
// import AntvHomeLogo from '../images/antvhome.svg';
import { useMedia } from 'react-use';
const { Option } = Select;
import {
    CheckOutlined,
    GithubOutlined,
    MenuOutlined,
    CaretDownFilled,
    DownOutlined,
    WechatOutlined,
  } from '@ant-design/icons';
import classNames from 'classnames';
export interface Doc {
  slug: string
  order: number
  title: {
    [key: string]: string
  }
  redirect: string
}

interface HeaderProps {
      /** 文档和演示的菜单数据 */
  navs?: Nav[];
      /** AntV root 域名，直接用主题的可不传 */
  rootDomain?: string;
      /** 默认语言 */
  defaultLanguage?: 'zh' | 'en';
      /** 是否是AntV官网 */
  isAntVSite?: boolean;
      /** 是否首页模式 */
  isHomePage?: boolean;
      /** 是否显示 AntV 产品卡片 */
  showAntVProductsCard?: boolean;
  siteTitle?: string
  location?: Location
  currentLangKey?: string
  docs: Doc[]
}

const Header: React.FC<HeaderProps> = ({
  siteTitle = '',
  showAntVProductsCard = true,
  location = { pathname: '' },
  isHomePage,
  navs = [],
  rootDomain = '',
  isAntVSite = false,
  defaultLanguage,
  currentLangKey = '',
  docs = [],
}) => {
    const { t, i18n } = useTranslation();
    const isAntVHome = isAntVSite && isHomePage; // 是否为AntV官网首页
    const lang =
      typeof defaultLanguage !== 'undefined'
        ? defaultLanguage
        : i18n.language || '';
    const isWide = useMedia('(min-width: 767.99px)', true);
    const [productMenuVisible, setProductMenuVisible] = useState(false);
    let productMenuHovering = false;
    const onToggleProductMenuVisible = () => {
        setProductMenuVisible(!productMenuVisible);
      };
    const onProductMouseEnter = (e: React.MouseEvent) => {
        productMenuHovering = true;
        e.persist();
        setTimeout(() => {
          if (e.target instanceof Element && e.target.matches(':hover')) {
            setProductMenuVisible(true);
          }
        }, 200);
      };
      const onProductMouseLeave = (e: React.MouseEvent) => {
        e.persist();
        productMenuHovering = false;
        setTimeout(() => {
          if (productMenuHovering) {
            return;
          }
          setProductMenuVisible(false);
        }, 200);
      };
    const productItemProps = isWide
    ? {
        onMouseEnter: onProductMouseEnter,
        onMouseLeave: onProductMouseLeave,
      }
    : {
        onClick: onToggleProductMenuVisible,
      };
      const menu = (
        <nav className={styles.nav}>
        <ul className={styles.menu}>
        {navs && navs.length ? <NavMenuItems path='' navs={navs} /> : null}
          {/* <DocsMenuItems docs={docs} currentLangKey={currentLangKey} /> */}
          <li>
          {showAntVProductsCard ? (
        <li {...productItemProps}>
          <a>
            {t('所有产品')}
            {!isAntVHome ? (
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
                alt="antv logo arrow"
                className={classNames(styles.arrow, {
                  [styles.open]: productMenuVisible,
                })}
              />
            ) : (
              <CaretDownFilled
                style={{ top: '1px', color: '#fff' }}
                className={classNames(styles.arrow, {
                  [styles.open]: productMenuVisible,
                })}
              />
            )}
          </a>
          <Products
            className={styles.productsMenu}
            show={productMenuVisible}
            rootDomain={rootDomain}
            language={defaultLanguage}
          />
        </li>
      ) : null}

          </li>
          <li>
            <Popover
              title={null}
            //   content={<Products />}
              placement="bottomRight"
              arrowPointAtCenter
            >
              <a>{t('生态')}</a>
            </Popover>
          </li>
        </ul>
        <Select
          size="small"
          style={{ width: 90, fontSize: 12 }}
          dropdownMatchSelectWidth={false}
          value={currentLangKey}
          onChange={(value: string) => {
            navigate(
              location.pathname.replace(`/${currentLangKey}/`, `/${value}/`)
            )
          }}
        >
          <Option value="en">🇺🇸 English</Option>
          <Option value="zh">🇨🇳 中文</Option>
        </Select>
        {/* <GithubCorner href="https://github.com/antvis" size={64} /> */}
      </nav>
      )
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>
          <Link to="/">
            <img
              src="https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg"
              alt={siteTitle}
            />
          </Link>
        </h1>
        <span className={styles.divider} />
      </div>
    {menu}
    </header>
  )
}

export default Header
