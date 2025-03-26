import "./globals.css";
import Navbar from "../components/Navbar"; // Om layout.tsx ligger djupare

import Footer from "../components/Footer";


export const metadata = {
  title: "Tandläkarmottagningen",
  description: "Välkommen till vår tandläkarmottagning",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 font-poppins flex flex-col min-h-screen">
        {/* Navbar högst upp */}
        <Navbar />
        
        {/* Innehållet i sidan */}
        <main className="flex-grow">{children}</main>

        {/* Footer längst ner */}
        <Footer />
      </body>
    </html>
  );
}
