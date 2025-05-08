import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import AuthProvider from "./providers/AuthProvider";
import { dmSans } from "@/components/fonts";
import Toast from "./providers/ToastProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Brandsquare Suppliers Hub",
    template: `%s - Brandsquare Suppliers`,
  },
  metadataBase: new URL("https://vendor.brandsquare.store/"),
  description:
    "The Supplier Hub is your go-to destination for building a thriving business without any stress",
  keywords: [
    "vendors",
    "e-commerce",
    "small business",
    "sell online",
    "online store",
    "stress-free selling",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body className="bg-white antialiased" suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toast />
            <Toaster theme="light" position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
