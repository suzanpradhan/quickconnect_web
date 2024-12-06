"use client";
import React, { useState } from "react";
import {
  AlignEndVertical,
  ChevronUp,
  ChevronDown,
  Search,
  Plus,
  UserPen,
  FileChartColumnIncreasing,
  User,
  HelpCircle,
  LogOut,
  Lock,
  Key,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center p-8 space-y-4 sm:space-y-0">
          {/* Left Header */}
          <div className="flex items-center justify-center sm:justify-start">
            <AlignEndVertical className="bg-blue-700 rounded-full text-white text-3xl p-4" />
            <p className="px-4 text-2xl font-bold text-blue-500">
              BigBlueButton
            </p>
          </div>

          {/* Right Header */}
          <div className="relative flex items-center space-x-4 justify-center sm:justify-end">
            {/* User Avatar */}
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <p className="text-lg text-gray-500">Bishnu Silwal</p>

            {/* Dropdown Toggle */}
            {isDropdownOpen ? (
              <ChevronUp
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              />
            ) : (
              <ChevronDown
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsDropdownOpen(true)}
              />
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  <li className="flex items-center px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    <User className="mr-2 text-gray-500" size={18} />
                    Profile
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    <HelpCircle className="mr-2 text-gray-500" size={18} />
                    Help Center
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    <Key className="mr-2 text-gray-500" size={18} />
                    Reset
                  </li>
                  <li className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-800 cursor-pointer rounded-md">
                    <LogOut className="mr-2 text-white " size={18} />
                    <p className="text-white"> Sign Out</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
}
