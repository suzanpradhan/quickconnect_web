"use client";
import React, { useState } from "react";
import { MessageSquare, UsersRound, X } from "lucide-react";

const Members = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative max-h-screen bg-gray-900/60">
      <button
        onClick={toggleSidebar}
        className="bg-blue-600 text-white p-2 rounded-full fixed top-4 right-4 z-10"
      >
        <UsersRound size={24} />
      </button>

      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="bg-blue-900 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Member List</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4"></div>
      </div>
    </div>
  );
};

export default Members;
