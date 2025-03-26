"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;;
        font-weight: 200;
    }
        
    input,
    textarea,
    select,
    button {
        font: inherit;
    }
`;

export default GlobalStyle;
