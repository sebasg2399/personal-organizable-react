import { Global as GEmotion, css } from "@emotion/react";
import { typography } from './typography';
const GlobalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@400;500;600&display=swap');
  *
 {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${typography.primary}
  }
  a{
    text-decoration: none;
    color:black;
  }
`;

export const Global = () => <GEmotion styles={GlobalStyles} />;
