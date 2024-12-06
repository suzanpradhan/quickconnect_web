"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { store } from "@/core/redux/store";
import Provider from "@/core/redux/provider";
import Sidebar from "./(Components)/Sidebar";
import { usePathname } from "next/navigation";
import SessionWrapper from "./SessionWrapper";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebarPaths = [
    "/register",
    "/login",
    "/forgotPassword",
    "/createNewPassword",
    "/practics",
  ];
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <SessionWrapper>
          {!hideSidebarPaths.includes(pathname) && (
            <ToastProvider>
              <Sidebar />
            </ToastProvider>
          )}
          <Provider>
            <main className="flex-1 bg-gray-100">{children}</main>
          </Provider>
          <div className="fixed top-0 right-0 m-4 z-50">
            <Toaster />
          </div>
        </SessionWrapper> 
      </body>
    </html>
  );
}
