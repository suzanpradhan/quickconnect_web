"use client"
import React from "react";
import { PencilOff, EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";


export default function Chat() {
  return (
    <div className="bg-black bg-opacity-50 w-1/3  h-screen rounded-md">
      {/* Top Section */}
      <div className="bg-blue-900 flex h-14 justify-evenly w-96 items-center ml-10 rounded-xl opacity-80- mt-4 ">
        <div>
          <p className="text-white text-sm font-bold">
            12 : 30 <br /> before close
          </p>
        </div>
        <div className="border-b border-[1px] border-white h-full"></div>
        <p className="text-white">Confirm Attendance</p>
        <PencilOff className="text-white" />
        <EllipsisVertical className="text-white" />
      </div>

      {/* Static Chat Messages */}
      <div>
        {/* First Message */}
        <div className="flex mt-10 ml-10">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"
              alt="Profile Picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex ml-2 -mt-2">
            <h1 className="text-base text-white font-bold">Bishnu Silwal</h1>
            <p className="text-base text-gray-300 pl-4">6m</p>
          </div>
        </div>
        <div className="bg-black/50 h-10 w-48 rounded-3xl flex items-center justify-center ml-20 -mt-6">
          <p className="text-white text-base">Everything is possible</p>
        </div>

        {/* Second Message */}
        <div className="flex justify-end mt-12 mr-10">
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <h1 className="text-base text-white font-bold">You</h1>
              <p className="text-base text-gray-300 pl-4">5m</p>
            </div>
            <div className="bg-blue-600/50 h-10 w-48 rounded-3xl flex items-center justify-center">
              <p className="text-white text-base">Yes, I agree!</p>
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
      <div className="flex items-center bg-black/60 p-4 rounded-xl mt-4">
        {/* Avatar */}
        <div>
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Picture"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Textarea Field */}
        <div className="flex-grow mx-4 mt-2">
          <textarea
            rows={1}
            placeholder="Type your message..."
            className="w-full px-4 py-2 text-white bg-black/40 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
            onChange={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          ></textarea>
        </div>

        {/* Send Button */}
        <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
          Send
        </button>
      </div>
    </div>
  );
}
