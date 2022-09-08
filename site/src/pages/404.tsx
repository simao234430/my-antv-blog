import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'gatsby';
// import Layout from 'gatsby-antv-blog/src/components/layout';


const NotFoundPage = () => (
  // <Layout>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">
            {/* <Icon type="home" /> */}
            Back Home
          </Button>
        </Link>
      }
    />
  // </Layout>
);

export default NotFoundPage;
