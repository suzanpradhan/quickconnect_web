"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/core/redux/clientStore";
import joinRoomApi from "@/modules/joinRoom/joinRoomApi";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast, useToast } from "@/hooks/use-toast";

export default function JoinRoom() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isJoining, setIsJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { chatId } = useParams();
  const session = useSession();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;

  const handleJoinRoom = async () => {
    if (!chatIdString || !session.data?.user?.accessToken) {
      toast({
        variant: "destructive",
        title: "Missing chatId & token.",
        description: "There was a problem.",
      });
      return;
    }

    try {
      setIsJoining(true);
      const result = await dispatch(
        joinRoomApi.endpoints.joinRoom.initiate({
          chatId: chatIdString,
          token: session.data?.user?.accessToken,
        })
      );
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Profile update failed.",
        description: "There was a problem.",
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div>
      <div className="grid col-span-1 mt-60  justify-center">
        <div className="flex mt-4 items-center space-x-2">
          <h1 className="font-bold text-green-500">Join Room:</h1>
          <h2 className="font-bold text-gray-700">{chatIdString}</h2>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          onClick={handleJoinRoom}
          disabled={isJoining}
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
        >
          {isJoining ? "Joining..." : "Join Room"}
        </button>
      </div>
    </div>
  );
}
