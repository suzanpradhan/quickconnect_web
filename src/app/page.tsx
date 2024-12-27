import React from "react";
import Header from "./(Components)/Header";
import ChatSidebar from "./(Components)/ChatSidebar";
import VideoChat from "./(Components)/VideoChat";
import MemberList from "./member-list/page";
import Members from "./(Components)/Members";

function App() {
  return (
    <div className="text-white max-h-screen overflow-auto">
      <Header />
      <VideoChat />
      <ChatSidebar />
    </div>
  );
}

export default App;
