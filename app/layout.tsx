// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import * as React from "react";
import './globals.css'
import NavBar from '@/components/nav-bar';


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