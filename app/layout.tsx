import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TTTPlay - play Tic-Tac-Toe",
  description: "TTTPlay is a Tic-Tac-Toe game featuring X and O winner counts, and options to reset the board or the entire game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-center justify-center min-h-screen`}>
        <div className="max-w-full p-5">
          {children}
        </div>
      </body>
    </html>
  );
}
