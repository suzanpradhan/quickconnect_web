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
            <div>
              <Sidebar />
            </div>
          )}
          <Provider>
            <main className="flex-1 bg-gray-100">{children}</main>
          </Provider>
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
