import React, { Children } from "react";
import Head from "next/head";

import "./globals.css";
import Provider from "./Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className="bg-[#282828]">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
