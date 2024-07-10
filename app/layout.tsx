// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import * as React from "react";
import './globals.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Provider from './_provider';
export const metadata = {
  title: "Injury Reporting System",
  description: "Injury reporting system",
  icons: { leif: "/favicon.ico" },
  manifest: "/manifest.json",
};


export default function RootLayout(
  { children }: { children: React.ReactNode }
) {

  return (
    <html lang="en">
      <Provider>
        <UserProvider>
          <body>{children}</body>
        </UserProvider>
      </Provider>
    </html>
  );
}