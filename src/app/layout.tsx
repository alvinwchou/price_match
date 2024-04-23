import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav, NavLink } from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Price Match App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-gradient-to-br from-white to-green-500  size-full overflow-hidden"
    >
      <body>
        <Nav>
          <NavLink href="/groceryList">Grocery List</NavLink>
          <NavLink href="/priceMatch">Price Match</NavLink>
          <NavLink href="/database">Database</NavLink>
        </Nav>
        <div className="container m-auto">{children}</div>
      </body>
    </html>
  );
}
