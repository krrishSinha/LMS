'use client'

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { store } from '../redux/store'
import { SessionProvider } from "next-auth/react"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/Admin/AdminSidebar"

// export const metadata: Metadata = {
//   title: "ELearning",
//   description: "ELearning is a platorm for students to learn and get help from teachers.",
//   keywords: 'Programming, MERN, React, NextJs, Redux, Machine Learning'
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning  >
      <body className={`  font-poppins  bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black`}>
        <Provider store={store}>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
              <Toaster />
              <Custom>
                <SidebarProvider>
                  <AdminSidebar />
                  <main>
                    <SidebarTrigger />
                    {children}
                  </main>
                </SidebarProvider>
              </Custom>
            </ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}



const Custom = ({ children }: any) => {
  const { isLoading } = useLoadUserQuery({})
  return (
    <>
      {
        isLoading ? <p>loading...</p> : <> {children}</>
      }
    </>
  )
}