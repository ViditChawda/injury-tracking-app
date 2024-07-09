// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import * as React from "react";
import './globals.css'
import NavBar from '@/components/nav-bar';
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
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}