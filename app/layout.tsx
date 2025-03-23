import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import { CustomThemeProvider } from "./ThemeProvider";
import { Metadata } from "next";
import GlobalStyle from "./GlobalStyles";

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Odyssey",
};

export default function RootLayout({ children }: Props) {
  return (
    <CustomThemeProvider>
      <StoreProvider>
        <html lang="en">
          <body>
            <GlobalStyle />
            {children}
          </body>
        </html>
      </StoreProvider>
    </CustomThemeProvider>
  );
}
