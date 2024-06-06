import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://zekezhang.com"), // Your site URL
  title: {
    default: "Zeke Zhang", // Default title
    template: "%s | Zeke Zhang", // Template title, %s will be replaced with the page title
  },
  description:
    "Melbourne based designer and researcher specializing machine learning, algorithmic design, and low-tech assembly craft in architecture.",
  icons: {
    icon: ["/favicon.ico?v=4"], // Favicon
    apple: ["/apple-touch-icon.png?v=4"], // Apple touch icon
    shortcut: ["/apple-touch-icon.png"], // Shortcut icon
  },
  keywords: [
    "Architecture",
    "Low-tech assembly craft",
    "Autonomos Material Reconstruction",
    "machine learning",
    "algorithmic design",
    "diffusion tectonics",
  ],
  creator: "Zeke Zhang", // Website creator
  manifest: "/site.webmanifest", // Path to site manifest
  authors: [{ name: "Zeke Zhang" }], // Website authors
  openGraph: {
    title: {
      default: "Zeke Zhang | Intelligent Synthesis", // Default title
      template: "Zeke Zhang | %s", // Template title, %s will be replaced with the page title
    },
    images: ["/opengraph-image.jpg"], // Open graph images
    description:
      "Melbourne based designer and researcher specializing machine learning, algorithmic design, and low-tech assembly craft in architecture.",
    type: "website", // Open graph type
    locale: "en_US", // Open graph locale
    url: "https://zekezhang.com", // Website URL
    siteName: "Zeke Zhang", // Website name
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
