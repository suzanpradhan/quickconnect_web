"use client";
import React, { useState } from "react";
import { Cross, MessageSquare, X } from "lucide-react"; // Message icon from Lucide
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-gray-100">
      {/* Message Icon */}
      <button
        onClick={toggleSidebar}
        className=" bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500"
      >
        <MessageSquare size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-black text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="bg-blue-900 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Chat</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
          >
      <X />
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-grow overflow-y-auto p-4">
          {/* Message 1 */}
          <div className="flex mb-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
                alt="Profile Picture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h4 className="font-bold">Bishnu Silwal</h4>
              <p className="text-gray-400 text-sm">Everything is possible</p>
            </div>
          </div>

          {/* Message 2 */}
          <div className="flex justify-end mb-4">
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <h4 className="font-bold">You</h4>
                <p className="text-gray-400 text-sm pl-4">Just now</p>
              </div>
              <div className="bg-blue-600/50 p-2 rounded-lg">
                <p>Yes, I agree!</p>
              </div>
            </div>
            <Avatar className="w-10 h-10 ml-2">
              <AvatarImage
                src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile Picture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Input Field */}
        <div className="p-4 bg-black/60 border-t border-gray-700 flex items-center">
          {/* Avatar */}
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Textarea */}
          <textarea
            rows={1}
            placeholder="Type your message..."
            className="flex-grow mx-4 px-4 py-2 text-black bg-gray-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            onChange={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          ></textarea>

          {/* Send Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
