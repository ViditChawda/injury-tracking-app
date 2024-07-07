// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import * as React from "react";
import './globals.css'


export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}