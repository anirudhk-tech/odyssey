"use client";

import { type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import { CustomThemeProvider } from "./ThemeProvider";
import GlobalStyle from "./GlobalStyles";
import { GlobalSnackbar } from "./GlobalSnackbar";
import { usePreferences } from "@/lib/features/preferences/hooks/usePreferences";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <CustomThemeProvider>
      <StoreProvider>
        <ClientSideInit>{children}</ClientSideInit>
      </StoreProvider>
    </CustomThemeProvider>
  );
}

function ClientSideInit({ children }: Props) {
  usePreferences();

  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <GlobalSnackbar />
        {children}
      </body>
    </html>
  );
}
