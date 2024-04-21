import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Intelligent Synthesis | Zeke Zhang",
  description:
    "Melbourne based designer and researcher specializing machine learning, algorithmic design, and low-tech assembly craft in architecture.",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  keywords: [
    "RMIT Architecture",
    "Low-tech assembly craft",
    "Autonomos Material Reconstruction",
    "machine learning",
    "algorithmic design",
    "diffusion tectonics",
  ],
  creator: "Zeke Zhang",
  manifest: "/site.webmanifest",
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
