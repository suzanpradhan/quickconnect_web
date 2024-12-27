"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";

import { useSession } from "next-auth/react";
import { ChatObject } from "@/modules/table-list/tableListType";
import { chatApi } from "@/modules/table-list/tableListApi";

export default function RoomList() {
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

  useEffect(() => {
    if (userId) {
      dispatch(chatApi.endpoints.getRoomList.initiate(userId));
    }
  }, [dispatch, userId]);

  console.log("Room List:", roomList);

  return (
    <div className="p-4">
      {roomList && roomList.length > 0 ? (
        roomList.map((room, index) => {
          const chatTable = room["chat_table"];
          return chatTable ? (
            <div key={index} className="p-4 border-b">
              <h1 className="text-black font-semibold">
                Chat ID: {chatTable.id}
              </h1>
              <p>Name: {chatTable.name}</p>
              <p>Group Chat: {chatTable.isGroupChat ? "Yes" : "No"}</p>
              <p>
                Created At: {new Date(chatTable.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <div key={index} className="p-4 border-b">
              <p className="text-red-500">Invalid data for this room.</p>
            </div>
          );
        })
      ) : (
        <p>No chat rooms found.</p>
      )}
    </div>
  );
}
