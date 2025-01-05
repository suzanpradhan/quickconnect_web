"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChatObject } from "@/modules/table-list/tableListType";
import { chatApi } from "@/modules/table-list/tableListApi";
import { MessageSquare, UsersRound } from "lucide-react";

export default function RoomList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useSession();
  const userId = session?.data?.user?.id;
  console.log("userId", userId);

  // Fetch Chat Room List
  const roomList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getRoomList-${userId}`]?.data as
        | ChatObject[]
        | undefined
  );
  console.log("roomlist", roomList);
  useEffect(() => {
    if (userId) {
      dispatch(chatApi.endpoints.getRoomList.initiate(userId));
    }
  }, [dispatch, userId]);

  console.log("Room List:", roomList);

  // Separate private and group chats
  const privateRooms = roomList?.filter(
    (room) => room.chat_table && !room.chat_table.isGroupChat
  );
  const groupRooms = roomList?.filter(
    (room) => room.chat_table && room.chat_table.isGroupChat
  );

  const handleRoomNavigation = (chatId: string) => {
    router.push(`/message/${chatId}`);
  };
  const memberList = () => {};

  return (
    <div className="p-4 bg-[#111111] h-screen text-white">
      <div className="md:flex sm:gap-16">
        {/* Private Rooms */}
        <div className="w-[60%]">
          <h2 className="text-xl font-bold mb-4">Private Rooms</h2>
          {privateRooms && privateRooms.length > 0 ? (
            privateRooms.map((room, index) => {
              const chatTable = room.chat_table;
              return (
                <div
                  key={index}
                  className="p-4 bg-[#1A1A1A] shadow-md border-x-2 border-green-500 rounded-md mb-4"
                >
                  <div className="flex items-center justify-between whitespace-nowrap">
                    <div>
                      {/* <h1 className="text-lg  whitespace-nowrap">
                        Chat ID: {chatTable.id}
                      </h1> */}
                      <p className="text-sm whitespace-nowrap">
                        Name: {chatTable.name}
                      </p>
                      <p className="text-sm">
                        Created At:{" "}
                        {new Date(chatTable.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <MessageSquare
                      className="text-green-500 text-2xl cursor-pointer"
                      onClick={() => handleRoomNavigation(chatTable.id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No private rooms found.</p>
          )}
        </div>

        {/* Group Rooms */}
        <div className=" w-[60%]">
          <h2 className="text-xl font-bold mb-4 ">Group Rooms</h2>
          {groupRooms && groupRooms.length > 0 ? (
            groupRooms.map((room, index) => {
              const chatTable = room.chat_table;
              return (
                <div
                  key={index}
                  className="p-4 bg-[#222222] shadow-lg border-x-2 border-blue-500 rounded-md mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      {/* <h1 className="text-lg">
                        Chat ID: <>{chatTable.id}</>
                      </h1> */}
                      <p className="text-sm">Name: {chatTable.name}</p>
                      <p className="text-sm whitespace-nowrap">
                        Created At:{" "}
                        {new Date(chatTable.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {/* <UsersRound className="text-green-500 text-2xl cursor-pointer" /> */}
                    <MessageSquare
                      className="text-blue-500 text-2xl cursor-pointer"
                      onClick={() => handleRoomNavigation(chatTable.id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No group rooms found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
