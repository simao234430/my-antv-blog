const path = require(`path`);
const fs = require('fs');
const mkdirp = require('mkdirp');
const { getSlugAndLang } = require('ptz-i18n');

const documentTemplate = require.resolve(`./src/templates/document.tsx`);
// Make sure the data directory exists
exports.onPreBootstrap = ({ store, reporter }) => {
    const { program } = store.getState();
  
    const dirs = [
      path.join(program.directory, 'docs'),
      path.join(program.directory, 'images'),
    ];
  
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        reporter.log(`creating the ${dir} directory`);
        mkdirp.sync(dir);
      }
    });
  };
  

// Define the "Event" type
exports.createSchemaCustomization = ({ actions }) => {

}

// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }) => {

  }

  // Add custom url pathname for posts
exports.onCreateNode = ({ node, actions, getNode, store }) => {
    const { createNodeField } = actions;
    const { program } = store.getState();
    if (node.internal.type === `File`) {
      createNodeField({
        node,
      });
    } else if (node.internal.type === `MarkdownRemark`) {
      const { slug, langKey } = getSlugAndLang(
        {
          langKeyForNull: 'any',
          langKeyDefault: 'none',
          useLangKeyLayout: false,
          pagesPaths: [program.directory],
          prefixDefault: true,
        },
        node.fileAbsolutePath,
      );
    //   if (!slug) {
    //     return;
    //   }
      createNodeField({
        node,
        name: `slug`,
        value: (langKey === 'none' ? `/zh${slug}` : slug).replace(/\/$/, ''),
      });
      createNodeField({
        node,
        name: `langKey`,
        value: langKey,
      });
    }
  };
  

  exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const result = await graphql(`
      {
        allMarkdownRemark(
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `);
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const { slug } = node.fields;
      createPage({
        path: slug, // required
        component: documentTemplate,
      });
    });
  };