import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Management",
  description: "An application to manage users",
};

if (
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
  process.env.NEXT_RUNTIME === "nodejs"
) {
  const { server } = await import("@/mocks/node");
  server.listen({
    onUnhandledRequest: "error",
  });
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="w-full py-3 px-5 bg-primary">
            <nav className="flex gap-5 text-white font-bold">
              <Link className="hover:underline underline-offset-4" href={'/'}>Home</Link>
              <Link className="hover:underline underline-offset-4" href={'/users'}>Users</Link>
            </nav>
          </header>

          <main className="flex w-full max-w-5xl mx-auto flex-col py-6 px-3">
            {children}
          </main>

          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
