


import React, { Children } from "react";

import "./globals.css";
import Provider from "./Provider";

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body className="bg-[#282828]">
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
