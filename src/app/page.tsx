"use client";
import React, { useState } from "react";
import Header from "./(Components)/Header";
import ChatSidebar from "./(Components)/ChatSidebar";
import VideoChat from "./(Components)/VideoChat";
import MemberList from "./member-list/page";
import Members from "./(Components)/Members";
import Navbar from "./(Components)/Navbar";
import Video from "./(Components)/Video";
import Activitybar from "./(Components)/Activitybar";
function App() {
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
          <Activitybar />
        </div> */}
      </div>
    </>
  );
}

export default App;
