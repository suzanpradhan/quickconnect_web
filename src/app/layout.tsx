"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { store } from "@/core/redux/store";
import Provider from "@/core/redux/provider";
import Sidebar from "./(Components)/Sidebar";
import { usePathname } from "next/navigation";
import SessionWrapper from "./SessionWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebarPaths = ["/register", "/login", "/forgotPassword","/createNewPassword"];
  return (
    <html lang="en">
   
      <body className="flex min-h-screen">
      <SessionWrapper>
        {/* Conditionally render Sidebar */}
        {!hideSidebarPaths.includes(pathname) && (
          <div>
            <Sidebar />
          </div>
        )}
        {/* Main content: Takes remaining space */}
        <Provider>
          <main className="flex-1 bg-gray-100">{children}</main>
        </Provider>
        </SessionWrapper>
      </body>
    </html>
  );
}
