import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { store } from '../redux/store'


export const metadata: Metadata = {
  title: "ELearning",
  description: "ELearning is a platorm for students to learn and get help from teachers.",
  keywords: 'Programming, MERN, React, NextJs, Redux, Machine Learning'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning  >
      <body className={`  font-poppins  bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black`}>
        <Provider store={store}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
            <Toaster />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
