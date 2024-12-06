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

export default function Rooms() {
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

        <div className="border-t">
          <h1 className="text-blue-700 font-bold text-lg ml-8 mt-4">Rooms</h1>
        </div>
      </div>

      {/* Search and New Room */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-[35%]">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="flex items-center bg-green-600 hover:bg-green-700 h-10 px-4 rounded-md text-white">
          <Plus className="mr-2" />
          <span>New Room</span>
        </button>
      </div>

      {/* Room Card */}
      <div className="mx-8 mb-4">
        <div className="bg-white shadow rounded-md p-4 w-full sm:w-[60%] lg:w-[35%]">
          <div className="flex items-center space-x-4">
            <UserPen className="text-blue-600 h-8 w-8"  />
            <div>
              <h1 className="text-black font-semibold text-lg">
                Bishnu Silwal's Room
              </h1>
              <p className="text-gray-500 text-sm">
                No previous session created
              </p>
            </div>
          </div>
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-between items-center">
            <FileChartColumnIncreasing className="text-gray-500 h-8 w-8"  />
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}