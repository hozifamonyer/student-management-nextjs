import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Navbar />

         <Toaster
    position="top-right"
    reverseOrder={false}
  />

  <main className="min-h-screen">
    {children}
  </main>


        <Footer />

      </body>
    </html>
  );
}