import React from 'react';
import { Skeleton } from 'antd';
import Layout from 'gatsby-antv-blog/src/components/layout';
 

const IndexPage = () => (
  <Layout>
    <div style={{ margin: '0 auto', padding: '0 80px' }}>
      Home Page
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  </Layout>
);

export default IndexPage;
