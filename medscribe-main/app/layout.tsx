import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "Med Scribe",
  description: "Learning appwrite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/icon.svg" type="image/svg" />
        <link rel="favicon" href="/icon.svg" type="image/x-icon" />
      </head>
      <body className="w-full h-dvh bg-background">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
