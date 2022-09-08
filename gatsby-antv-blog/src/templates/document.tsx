import { graphql } from 'gatsby';
import React from 'react';
export default function Template({
    data, // this prop will be injected by the GraphQL query below.
    path,
  }: {
    data: any;
    path: string;
  })  {
    const { markdownRemark} = data; // data.markdownRemark holds our post data
    const {
 
      fields: { slug },

    } = markdownRemark;

    return (
 
        <h2>{markdownRemark.fields.slug}</h2>
 

    )
  }



  export const pageQuery = graphql`
  query($path: String!) {

    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      tableOfContents
      fields {
        slug
        langKey
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
`;
