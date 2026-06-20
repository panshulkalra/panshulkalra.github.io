import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Link } from 'gatsby';

const StyledBlogSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .blog-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Blog = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledBlogSection id="blog" ref={revealContainer}>
      <h2 className="numbered-heading overline">Technical Writing</h2>
      <h2 className="title">Read My Blog.</h2>
      <p>
        I frequently write about my journey in computer engineering, deep dives into machine learning algorithms, and thoughts on energy flexibility markets like the India Energy Stack and Negawatts. Check out my latest articles.
      </p>
      <Link className="blog-link" to="/blog">
        View Articles
      </Link>
    </StyledBlogSection>
  );
};

export default Blog;