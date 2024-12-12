"use client";
import React, { useState } from "react";
import { User, Search, Cross, X } from "lucide-react"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Member() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* User Icon */}
      <button
        onClick={toggleSidebar}
        className=" bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500"
      >
        <User size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-black text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="bg-blue-900 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">People</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
          >
                <X />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-grow overflow-y-auto p-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <h1 className="mt-4">Member List</h1>
          <div className="flex mt-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
                alt="Profile Picture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h4 className="font-bold">Bishnu Silwal</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
