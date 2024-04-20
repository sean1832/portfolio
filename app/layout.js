import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zeke Zhang",
  description: "Portfolio of Zeke Zhang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
