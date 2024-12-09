"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/core/redux/clientStore";
import joinRoomApi from "@/modules/joinRoom/joinRoomApi";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function JoinRoom() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isJoining, setIsJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { chatId } = useParams();
  const session = useSession();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  const handleJoinRoom = async () => {
  
    console.log("chatId:", chatIdString);
    console.log("token:", session.data?.user?.accessToken);

    if (!chatIdString || !session.data?.user?.accessToken) {
      setErrorMessage("Missing chatId or token.");
      return;
    }
  
    try {
      setIsJoining(true);
      const result = await dispatch(
        joinRoomApi.endpoints.joinRoom.initiate({ chatId: chatIdString, token:session.data?.user?.accessToken })
      )

 
    } catch (err) {
      console.error("Error joining room:", err);
      setErrorMessage("Failed to join the room. Please try again.");
    } finally {
      setIsJoining(false); 
    }
  };

  return (
    <div>
      <h1>Join Room: {chatIdString}</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>} 

      <button
        onClick={handleJoinRoom}
        disabled={isJoining} 
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isJoining ? "Joining..." : "Join Room"}
      </button>
    </div>
  );
}
