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
  Hand,
  Video,
  Phone,
  EllipsisVertical,
  MessageSquareText,
  UsersRound,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Message from "./Message";

interface ActivitybarProps {
  chatId: string;
}

export default function Activitybar({ chatId }: ActivitybarProps) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const router = useRouter();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  const handleMessageClick = () => {
    setIsMessageOpen(true);
  };

  const controls = [
    { label: "Mic", Icon: Mic },
    { label: "Cam", Icon: Camera },
    { label: "Volume", Icon: Volume2 },
    { label: "Record", Icon: CircleDot },
    { label: "Hand", Icon: Hand },
    { label: "Share Screen", Icon: ScreenShare },
    { label: "EllipsisVertical", Icon: EllipsisVertical },
    { label: "Phone", Icon: Phone },
  ];

  return (
    <>
      <div className="flex items-center">
        <p className="whitespace-nowrap">Class meeting</p>
        <div className="flex items-center justify-between w-full ml-40">
          <div className="flex gap-8 p-4 flex-none">
            {controls.map(({ label, Icon }, index) => (
              <button
                key={index}
                className={`${
                  label === "Phone"
                    ? "bg-red-500 rounded-md "
                    : "bg-black bg-opacity-50 px-2 rounded-full"
                } relative group`}
              >
                <Icon size={40} className=" bg-opacity-50 px-2  " />
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <Info />
            <UsersRound />
            <MessageSquareText onClick={handleMessageClick} />

            {isMessageOpen && (
              <div className="fixed top-0 right-0 h-[83%] w-96 bg-[#1b1b1d] text-white transform rounded-b-lg shadow-lg">
                {/* Texture and Blur Overlay */}
                {/* <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md drop-shadow-md">
                
                  <div className=" p-4 flex justify-between items-center rounded-t-lg">
                    <h2 className="text-lg font-bold">Messages</h2>
                    <button
                      onClick={() => setIsMessageOpen(false)}
                      className="text-white hover:text-gray-300 focus:outline-none"
                    >
                      <X size={24} />
                    </button>
                  </div>

       
                  <div className="flex-grow overflow-y-auto p-4"> </div>
                </div> */}
                <div className=" ">
                  <Message chatId={chatIdString || ""} />
                </div>
              </div>
            )}
            <Video />
          </div>
        </div>
      </div>
    </>
  );
}
