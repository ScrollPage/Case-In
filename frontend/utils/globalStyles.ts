import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    height: 100%;
  }
  body, #__next {
    min-height: 100%;
  }
  body {
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 5px;
      @media (max-width: 900.98px) {
        width: 0px;
      }
    }
    &::-webkit-scrollbar-track {
      height: 90%;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0099FF;
    }
  }
  #nprogress .bar {
    background: #0099FF !important;
  }
`;

export const globalTheme = {
  blue: "#0099FF",
  lightBlue: "#CCEBFF",
  green: "#60CFBF",
  greenBgc: "#D4FFC5",
  red: "#CF6060",
  yellow: "#CFBD60",
  yellowBgc: "#FFF9C5",
  white: "#FFF",
  orange: "#E86900",
  blueBgc: "#FAFCFF",
  grayBgc: "#F3F3F3",
};