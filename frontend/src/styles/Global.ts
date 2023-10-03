import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import fonts from './fonts.module.css';

export const GlobalStyle = createGlobalStyle`
  ${reset};
  ${fonts};

  * {
      box-sizing: border-box;
  }

  html {
      width: 100%;
      height: 100%;
      font-size: 100.01%;
  }

  body {
      width: 100%;
      height: 100%;
      margin: 0;
      font-family: ${theme.fonts.regular}, sans-serif;
  }

  code {
      font-family: source-code-pro,
      Menlo,
      Monaco,
      Consolas,
      "Courier New",
      monospace;
  }

  #root {
      width: 100%;
      height: 100%;
  }
`;
