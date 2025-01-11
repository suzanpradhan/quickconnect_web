import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Navbar() {
  return (
    <>
      <div className="bg-[#535353] h-14 flex items-center rounded-md shadow-md">
        <Avatar className="m-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className=" font-Poppins">Fathima is presenting</p>
      </div>
    </>
  );
}
