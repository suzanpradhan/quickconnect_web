import Image from "next/image";
import Link from "next/link";
import Header from "./(Components)/Header";
import Chat from "./(Components)/Chat";
import VideoChat from "./(Components)/VideoChat";
import Navbar from "./(Components)/Nav";
import Member from "./(Components)/Member";

export default function Home() {
  return (
    <div>
      <div className=" ">{/* <Navbar/>  */}</div>
      <div className="flex">
        <Chat />
        <Member />
      </div>

      {/* <div className=" flex flex-1 md:shrink-0 ">
      <VideoChat/>
      
    </div> */}
    </div>
  );
}
