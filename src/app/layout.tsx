import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { unstable_ViewTransition as ViewTransition } from "react";
import { theme } from "@/app/theme";

export const metadata: Metadata = {
  title: "蒸気の時代 Online",
  description: "蒸気の時代をテーマにしたオンラインゲーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ViewTransition>
          <MantineProvider theme={theme}>
            <Notifications autoClose={10 * 1000} />
            {children}
          </MantineProvider>
        </ViewTransition>
      </body>
    </html>
  );
}
