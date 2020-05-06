import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default ({ data }) => {
  const title = data.mdx.frontmatter.title;
  const body = data.mdx.rawBody;

  return (
    <div className="mb-4">
      <h1 className="blog_single-title accent-heading">{title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { path: { eq: $slug } }) {
      rawBody
      frontmatter {
        title
      }
    }
  }
`;
