"use client";
import Activitybar from "@/app/(Components)/Activitybar";
import Navbar from "@/app/(Components)/Navbar";
import Video from "@/app/(Components)/Video";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Message from "@/app/(Components)/Message";
import Demo from "@/app/(Components)/Demo";

function App() {
  const { chatId } = useParams();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;

  return (
    <>
      <div className="text-white h-screen overflow-auto bg-[#313131]">
        {/* <div className="m-4 rounded-md ">
          <Navbar />
        </div>
        <div className=" m-10">
          <Video />
        </div>
        <div className=" m-10">
          <Activitybar chatId={chatIdString || ""} />
        </div> */}
        {/* <div className=" m-10">
          <Message chatId={chatIdString || ""} />
        </div> */}
        <Demo chatId={chatIdString || ""} />
      </div>
    </>
  );
}

export default App;
