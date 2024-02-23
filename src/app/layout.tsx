"use client"
import React, { Children } from "react";
import Head from "next/head";

import "./globals.css";
import Provider from "./Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        />
      </body>  
    </html>
  );
}
