'use client'

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { store } from '../redux/store'
// import { SessionProvider } from "next-auth/react"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import React from "react";
import { PrimeReactProvider } from 'primereact/api';
import FullScreenLoader from "@/components/Loader";

 const metadata: Metadata = {
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
    <html lang="en"   >
      <body className={`  font-poppins  bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black`}>
        <Provider store={store}>
          {/* <SessionProvider> */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
            <Toaster />
            <PrimeReactProvider>
              <AppInitializer >
                {children}
              </AppInitializer>
            </PrimeReactProvider>
          </ThemeProvider>
          {/* </SessionProvider> */}
        </Provider>
      </body>
    </html>
  );
}



const AppInitializer = ({ children }: any) => {

  const { data, isLoading, error } = useLoadUserQuery({});

  if (isLoading) {
    return (
     <FullScreenLoader />
    );
  }

  if (error) {
    console.log("LoadUser error:", error);
  }

  return <>{children}</>;

}