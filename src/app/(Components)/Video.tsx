"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function Video() {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleMessageClick = () => {
    setIsMessageOpen(true);
  };
  return (
    <>
      <div className="flex justify-between overflow-hidden">
        <div className="relative w-[65%] h-[493px] rounded-lg overflow-hidden">
          {/* <Image
            src="/profile.png"
            width={500}
            height={500}
            alt="Picture of the author"
          /> */}
          <img
            src="https://images.unsplash.com/photo-1725011803245-1bf502fc60a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFBFUlNPTiUyMHBob3RvfGVufDB8fDB8fHww"
            alt="Main Speaker"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="h-[493px] overflow-y-scroll scrollbar-hide">
          <div className="grid justify-center gap-4 grid-cols-2">
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
                name: "Sita silwal",
                src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Ram silwal",
                src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
              },
              {
                name: "Sita silwal",
                src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Ram silwal",
                src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
              },
              {
                name: "Sita silwal",
                src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Ram silwal",
                src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
              },
              {
                name: "Sita silwal",
                src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Ram silwal",
                src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
              },
              {
                name: "Sita silwal",
                src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Ram silwal",
                src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
              },
              // Add additional image objects as needed
            ].map((profile, index) => (
              <div
                key={index}
                className="relative w-48 h-28 bg-gray-700 rounded-lg overflow-hidden"
              >
                <img
                  src={profile.src}
                  alt={profile.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 rounded text-sm">
                  {profile.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
