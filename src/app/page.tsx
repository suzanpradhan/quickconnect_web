import Image from "next/image";
import Link from "next/link"; 
import Header from "./(Components)/Header";
import Chat from "./(Components)/Chat";
import VideoChat from "./(Components)/VideoChat";
import Navbar from "./(Components)/Nav";

export default function Home() {
  return (
    <div className="bg-[#3f3f46] ">
      <div className=" ">
        <Navbar/> 
      </div>
      <div className=" flex flex-1 md:shrink-0 ">
      <VideoChat/>
      <Chat />
    </div>
    </div>
  );
}
