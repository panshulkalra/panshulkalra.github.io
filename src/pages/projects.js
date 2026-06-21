import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledProjectsContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 50px; 

  @media (max-width: 768px) {
    padding: 80px 25px; 
  }

  header {
    margin-bottom: 50px;
    text-align: center; /* ADDED: Centers the heading and subtitle perfectly */
  }

  .project-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .project-item {
    transition: var(--transition);

    &:hover {
      transform: translateY(-5px);
    }

    a {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2.5rem 2rem;
      height: 100%;
      min-height: 300px; 
      background-color: var(--light-navy);
      border-radius: var(--border-radius);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); 
      text-decoration: none;
      border: 1px solid transparent;

      &:hover,
      &:focus {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
    }

    .folder-icon {
      font-size: 35px;
      margin-bottom: 25px;
    }

    h3 {
      margin-bottom: 10px;
      font-size: clamp(20px, 3vw, 24px);
      color: var(--lightest-slate);
    }

    .project-desc {
      font-size: var(--fz-md);
      color: var(--slate);
      margin-bottom: 20px;
      line-height: 1.5;
      flex-grow: 1; 
    }

    .project-meta {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--light-slate);
      display: flex;
      align-items: center;
      
      &::before {
        content: '⚡'; 
        margin-right: 8px;
        font-size: 12px;
      }
    }
  }
`;

const ProjectsPage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;

  return (
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
              const { title, slug, date, description } = frontmatter;

              return (
                <li className="project-item" key={i}>
                  <Link to={slug}>
                    <div>
                      <div className="folder-icon">📁</div>
                      <h3>{title}</h3>
                      {description && <p className="project-desc">{description}</p>}
                    </div>
                    <div className="project-meta">
                      {date && <span>{date}</span>}
                    </div>
                  </Link>
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
            description 
          }
        }
      }
    }
  }
`;
