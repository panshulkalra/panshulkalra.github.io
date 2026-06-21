/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const projectTemplate = path.resolve(`src/templates/project.js`); // NEW: Project Template Blueprint

  // Query both Posts and Projects
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              series
            }
          }
        }
      }
      projectsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // --- 1. CREATE BLOG POST PAGES ---
  const posts = result.data.postsRemark.edges;
  posts.forEach(({ node }) => {
    if (node.frontmatter.slug) {
      createPage({
        path: node.frontmatter.slug,
        component: postTemplate,
        context: {},
      });
    }
  });

  // --- 2. CREATE BLOG SERIES PAGES ---
  const seriesTemplate = path.resolve('./src/templates/series.js');
  const seriesSet = new Set();
  
  posts.forEach(({ node }) => {
    if (node.frontmatter.series) {
      seriesSet.add(node.frontmatter.series);
    }
  });

  seriesSet.forEach(seriesName => {
    const formattedSlug = seriesName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const seriesUrl = `/blog/${formattedSlug}`;

    createPage({
      path: seriesUrl,
      component: seriesTemplate,
      context: {
        series: seriesName,
      },
    });
  });

  // --- 3. CREATE PROJECT CASE STUDY PAGES ---
  const projects = result.data.projectsRemark.edges;
  projects.forEach(({ node }) => {
    if (node.frontmatter.slug) {
      createPage({
        path: node.frontmatter.slug,
        component: projectTemplate,
        context: {},
      });
    }
  });
};

// --- WEBPACK CONFIG (DO NOT TOUCH) ---
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /scrollreveal/, use: loaders.null() },
          { test: /animejs/, use: loaders.null() },
          { test: /miniraf/, use: loaders.null() },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
