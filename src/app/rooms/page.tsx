import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Rooms() {
  return (
    <div className="bg-[#1E1E1E] h-screen w-full">
      <h1 className="text-white font-bold font-helvetica text-2xl pl-14 pt-14">
        Rooms
      </h1>

      <div className="bg-[#222222] w-96 h-72 ml-14 mt-4">
        <div>
          <h1 className="text-white p-4 font-helvetica text-lg font-normal">
            IT Consultant Room
          </h1>
          <div className="flex items-center px-4">
            <div className="flex items-center">
              <div className="relative w-12 h-10">
                <Avatar className="h-10 w-10 absolute">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="relative w-12 h-10">
                <Avatar className="h-10 w-10 absolute -left-5">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="relative w-12 h-10">
                <Avatar className="h-10 w-10 absolute -left-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <p className="text-[#9BA0AB] -ml-10">28+</p>
          </div>
          <p className="text-white font-helvetica font-normal text-base p-4">
            Last Session:
          </p>
        </div>
        <div className="py-[72px]">
        <hr className="border-0 h-[1px] bg-[#4E4E4E]" />

          <button className="bg-[#169AD6] text-white py-2 px-6  ml-2 mt-2 font-helvetica">
            Start a call
          </button>
        </div>
      </div>
    </div>
  );
}
