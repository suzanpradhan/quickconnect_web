"use client"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { chatApi } from "@/modules/table-list/tableListApi";
import { RootState } from "@/core/redux/store";
import { ChatObject } from "@/modules/table-list/tableListType"; 
import { ProfileDataType } from "@/modules/profile/profileType";
import profileApi from "@/modules/profile/profileApi";

const ChatMembers = () => {
  const dispatch = useAppDispatch();
  const [chatId, setChatId] = useState<string | null>(null);

  // Fetch Profile Data
  const profileData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getProfileByToken(undefined)`]?.data as ProfileDataType
  );

  useEffect(() => {
    dispatch(profileApi.endpoints.getProfileByToken.initiate());
  }, [dispatch]);

  // Fetch Chat Members
  const chatMembers = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getChatDetails-${profileData?.userInfo.id}`]?.data as Array<ChatObject>
  );

  useEffect(() => {
    if (profileData?.userInfo.id) {
      dispatch(chatApi.endpoints.getChatDetails.initiate(profileData.userInfo.id));
    }
  }, [dispatch, profileData?.userInfo.id]);

  // Update chatId dynamically based on chatMembers
  useEffect(() => {
    if (chatMembers?.length > 0) {
      setChatId(chatMembers[0]["chat-table"]?.id || null);
    }
  }, [chatMembers]);

  // Loading state
  if (!chatMembers) return <div>Loading chat members...</div>;

  return (
    <div>
      {chatMembers.map((chatMember, index) => (
        <div key={index} className="chat-member">
          <h1 className="text-black">Chat: {chatMember["chat-table"]?.name}</h1>
          <div>
            <h2 className="text-black">Chat Members:</h2>
            <p className="text-black">Member ID: {chatMember["chat-member"]?.userId}</p>
            <p className="text-black">Is Admin: {chatMember["chat-member"]?.isAdmin ? "Yes" : "No"}</p>
            <p className="text-black">Joined At: {new Date(chatMember["chat-member"]?.joinedAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMembers;
