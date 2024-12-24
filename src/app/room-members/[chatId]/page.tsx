"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { roomMembersApi } from "@/modules/room-members/roomMemberApi";

export default function RoomMembers() {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();

  // Ensure chatId is a string
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  console.log("chatId", chatIdString);

  // Retrieve members data based on chatId
  const roomMembers = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getRoomMembers-${chatIdString}`]?.data as
        | ChatData
        | undefined
  );

  useEffect(() => {
    if (chatIdString) {
      dispatch(roomMembersApi.endpoints.getRoomMembers.initiate(chatIdString));
    }
  }, [dispatch, chatIdString]);

  return (
    <div className="p-4">
      {roomMembers && roomMembers.members.length > 0 ? (
        roomMembers.members.map((member) => (
          <div key={member.id} className="p-4 border-b">
            <h1 className="text-black font-semibold">{member.memberName}</h1>

            <p>Joined At: {new Date(member.joinedAt).toLocaleString()}</p>
            {member.isAdmin && <p>Admin</p>}
          </div>
        ))
      ) : (
        <p>No members found for this chat room.</p>
      )}
    </div>
  );
}
