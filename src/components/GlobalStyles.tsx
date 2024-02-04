import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* html {
    margin: 0;
    padding: 0;
  } */

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: auto;
    right: 0;
    background-color: darkcyan;
  }
`;

export default GlobalStyles;
