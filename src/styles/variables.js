import { css } from 'styled-components';

const variables = css`
  :root {
    /* Backgrounds - Sophisticated Ivory/Cream Palette */
    --dark-navy: #e9e4d5;      /* Borders and subtle dividers */
    --navy: #faf1d4;           /* MAIN BACKGROUND: Yellowish off-white / Warm Cream */
    --light-navy: #ffffff;     /* Card/Section backgrounds: Pure white for clean separation */
    --lightest-navy: #f3edd9;  /* Hover states for cards */
    --navy-shadow: rgba(45, 40, 30, 0.06); /* Ultra-soft warm shadow for depth */
    
    /* Text - Balanced Warm Charcoal Palette */
    --dark-slate: #a6a090;     /* Lightest text / metadata */
    --slate: #7c7667;          /* Muted text */
    --light-slate: #545045;    /* Secondary text */
    --lightest-slate: #2c2a24; /* MAIN TEXT / Subheadings */
    --white: #181714;          /* Headings: Warm near-black for high contrast readability */

    /* Accents - Muted & Professional (No harsh or overly bold tones) */
    --green: #385a6c;          /* Muted Slate Blue: Sophisticated, highly readable accent */
    --green-tint: rgba(56, 90, 108, 0.1); /* Soft slate tint for button hover states */
    --pink: #b8738d;           /* Soft dusty rose */
    --blue: #608294;           /* Soft steel blue */

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;