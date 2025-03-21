import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import { CustomThemeProvider } from "./themeProvider";
import { Metadata } from "next";

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
          <body>{children}</body>
        </html>
      </StoreProvider>
    </CustomThemeProvider>
  );
}
