const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostSingle = path.resolve('src/templates/BlogPostSingle.js');

  try {
    const blogPostsQuery = await graphql(
      `
        query BlogPostsPathQuery {
          allMdx(
            sort: { order: ASC, fields: [frontmatter___date] }
            filter: { frontmatter: { category: { eq: "blog" } } }
          ) {
            edges {
              next {
                frontmatter {
                  path
                  title
                }
              }
              previous {
                frontmatter {
                  path
                  title
                }
              }
              node {
                frontmatter {
                  path
                  category
                }
              }
            }
          }
        }
      `,
      { limit: 1000 }
    );

    const blogPosts = blogPostsQuery.data.allMdx.edges;

    blogPosts.forEach(({ node, next, previous }) => {
      const path = node.frontmatter.path;

      createPage({
        path,
        component: blogPostSingle,
        context: {
          slug: path, // use 'slug', as 'path' is reserved keyword. Access in component as props.pageContext.slug
          previous,
          next
        }
      });
    });
  } catch (error) {}
};
