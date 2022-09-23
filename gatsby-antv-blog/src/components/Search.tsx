import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';
 
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits  } from 'react-instantsearch-hooks-web';
// import { DocSearch } from '@docsearch/react';
import { DocSearch } from './docsearch'
import '@docsearch/css';
const searchClient = algoliasearch('6YSSSBX98L', '86d2e4fe47717b699ce91fc9cf27a0fe');
import * as styles from './Search.module.less';

export interface SearchProps {
  // algolia 搜索配置
  docsearchOptions?: {
    versionV3?: boolean; // 目前有两个版本的 docsearch.js，V2.x 和 V3.x，此开关决定用哪一个版本的搜索框，根据申请到的参数版本决定，二者互不兼容，详情见 https://docsearch.algolia.com/
    appId?: string; // V3.x 版本 docsearch 需要appId, V2.x 版不需要。
    apiKey: string;
    indexName: string;
  };
}


const Search: React.FC<SearchProps> = ({  }) => {
 
  const { t, i18n } = useTranslation();
  useEffect(() => {
 
  }, []);
  return (
<div id="docsearch">
         <DocSearch

 
      appId="6YSSSBX98L"
      indexName="Pages"
      apiKey="86d2e4fe47717b699ce91fc9cf27a0fe"
      transformItems={(items) => {
        console.log(items)
        return items.map((item) => ({
          ...item,

        }));
      }}
    />


       {/* <InstantSearch searchClient={searchClient} indexName="Pages">
        <SearchBox />
      <Hits />
    </InstantSearch>  */}
        </div>
 
  );
};

export default Search;
