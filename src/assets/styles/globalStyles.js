import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
   box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    min-height: 100vh;
    min-width: 100vw;
    background-color: #F5F7FA;
  }

  button {
    border: none;

    :focus {
      outline: none;
    }
  }
`;
