import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import NavBar from "@/components/section/navbar";
// import PageAnimatePresence from "@/components/HOC/pageAnimatePresence";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://zekezhang.com"),
  title: {
    default: "Zeke Zhang",
    template: "%s | Zeke Zhang",
  },
  description:
    "Melbourne based designer and researcher specializing machine learning, algorithmic design, and low-tech assembly craft in architecture.",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  keywords: [
    "Architecture",
    "Low-tech assembly craft",
    "Autonomos Material Reconstruction",
    "machine learning",
    "algorithmic design",
    "diffusion tectonics",
  ],
  creator: "Zeke Zhang",
  manifest: "/site.webmanifest",
  authors: [{ name: "Zeke Zhang" }],
  openGraph: {
    title: {
      default: "Zeke Zhang | Intelligent Synthesis",
      template: "Zeke Zhang | %s",
    },
    description:
      "Melbourne based designer and researcher specializing machine learning, algorithmic design, and low-tech assembly craft in architecture.",
    type: "website",
    locale: "en_US",
    url: "https://zekezhang.com",
    siteName: "Zeke Zhang",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
