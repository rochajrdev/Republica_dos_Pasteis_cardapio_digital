import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "República dos Pastéis - Cardápio Digital",
  description: "Cardápio online da República dos Pastéis. Pastéis deliciosos feitos na hora em Aracaju.",
  keywords: ["pastel", "pastéis", "delivery", "Aracaju"],
  openGraph: {
    title: "República dos Pastéis",
    description: "Pastéis deliciosos feitos na hora!",
    images: ["/assets/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="transition-colors duration-300 bg-gray-50 dark:bg-zinc-900 font-['Poppins']">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
