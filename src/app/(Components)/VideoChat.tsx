"use client";
import React, { useState } from "react";
import {
  Volume2,
  CircleDot,
  Mic,
  Camera,
  ScreenShare,
  Smile,
  Link,
  LogOut,
  User,
  Fullscreen,
  ClipboardList,
  X,
} from "lucide-react";

const VideoChat = () => {
  const [isMembersOpen, setIsMembersOpen] = useState(false);

  const controls = [
    { label: "Volume", Icon: Volume2 },
    { label: "Record", Icon: CircleDot },
    { label: "Mic", Icon: Mic },
    { label: "Cam", Icon: Camera },
    { label: "Share Screen", Icon: ScreenShare },
    { label: "Sticker", Icon: Smile },
    { label: "Share Link", Icon: Link },
    { label: "Leave", Icon: LogOut },
  ];

  const handleMembersClick = () => {
    setIsMembersOpen(true);
  };

  return (
    <div className="flex flex-col h-screen max-h-fit bg-gray-900/60 text-white overflow-hidden">
      {/* Main Video */}
      <div className="flex flex-col items-center px-4 flex-none">
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1725011803245-1bf502fc60a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFBFUlNPTiUyMHBob3RvfGVufDB8fDB8fHww"
            alt="Main Speaker"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 p-2 rounded text-sm">
            <div className="flex items-center px-2">
              <User className="text-white" />
              <span className="font-medium ml-2">Shiva Silwal</span>
            </div>
          </div>
          <div className="absolute bottom-4 w-full flex justify-around">
            <ClipboardList className="text-center bg-black bg-opacity-60 p-2 rounded-full text-white h-10 w-10" />
            <p className="text-center bg-black bg-opacity-60 p-2 rounded-md">
              Who here can't code and then move on to design? Raise your hand.
            </p>
            <Fullscreen className="text-center bg-black bg-opacity-60 p-2 rounded-full text-white h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Participant Videos */}
      <div className="flex justify-center space-x-4 p-4 bg-gray-800 flex-none">
        {[
          {
            name: "Sita silwal",
            src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            name: "Ram silwal",
            src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
          },
          {
            name: "You",
            src: "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
          },
        ].map((profile, index) => (
          <div
            key={index}
            className="relative w-28 h-28 bg-gray-700 rounded-lg overflow-hidden"
          >
            <img
              src={profile.src}
              alt={profile.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 rounded text-sm">
              {profile.name}
            </div>
            {index === 2 && (
              <div className="absolute top-2 right-2 bg-blue-500 w-3 h-3 rounded-full"></div>
            )}
          </div>
        ))}
        <div
          className="flex items-center justify-center w-28 h-28 bg-gray-700 rounded-lg cursor-pointer"
          onClick={handleMembersClick}
        >
          <span className="text-xl text-white">+24</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-around p-4 bg-gray-800 flex-none">
        {controls.map(({ label, Icon }, index) => (
          <button
            key={index}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              label === "Leave"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            <Icon size={20} />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      {/* Member List Sidebar */}
      {isMembersOpen && (
        <div className="fixed top-0 right-0 h-[87%] w-80 bg-red-300 text-white transform rounded-b-lg">
          <div className="bg-blue-900 p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Member List</h2>
            <button
              onClick={() => setIsMembersOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {/* Add your member list content here */}
            <p className="text-center">
              List of members will be displayed here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoChat;
