// import localFont from "next/font/local";
import UserProvider from "@/providers/UserProvider";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Bfood - Website",
  description: "Bfood food services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body dir="rtl">
        <UserProvider>
        {children}

        </UserProvider>
        </body>
    </html>
  );
}
