import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledProjectsContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  header {
    margin-bottom: 50px;
  }

  .project-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .project-item {
    margin-bottom: 20px;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    border: 1px solid transparent;

    &:hover {
      transform: translateY(-5px);
      border-color: var(--green);
    }

    h3 {
      margin-bottom: 10px;
      font-size: clamp(24px, 3vw, 28px);

      a {
        color: var(--lightest-slate);
        text-decoration: none;
        
        &:hover {
          color: var(--green);
        }
        
        &::after {
          display: none;
        }
      }
    }

    .project-meta {
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      color: var(--green);
    }
  }
`;

// FIXED: Added location prop here
const ProjectsPage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;

  return (
    // FIXED: Passed location prop to Layout here
    <Layout location={location}>
      <Helmet title="Projects | Panshul Kalra" />
      <StyledProjectsContainer>
        <header>
          <h1 className="big-heading">All Projects</h1>
          <p className="subtitle">An archive of my technical models and case studies.</p>
        </header>

        <ul className="project-list">
          {projects.length > 0 ? (
            projects.map(({ node }, i) => {
              const { frontmatter } = node;
              const { title, slug, date } = frontmatter;

              return (
                <li className="project-item" key={i}>
                  <h3>
                    <Link to={slug}>{title}</Link>
                  </h3>
                  <div className="project-meta">
                    {date && <span>{date}</span>}
                  </div>
                </li>
              );
            })
          ) : (
            <p>New case studies are currently being documented. Check back soon.</p>
          )}
        </ul>
      </StyledProjectsContainer>
    </Layout>
  );
};

export default ProjectsPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM YYYY")
            title
            slug
          }
        }
      }
    }
  }
`;