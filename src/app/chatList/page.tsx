"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { chatApi } from "@/modules/chatList/chatListApi";
import { RootState } from "@/core/redux/store";
import { ChatObject } from "@/modules/chatList/chatListType";
import profileApi from "@/modules/profile/profileApi";
import { ProfileDataType } from "@/modules/profile/profileType";
import { MemberObject } from "@/modules/MemberList/memberListType";
import { memberApi } from "@/modules/MemberList/memberListApi";

const ChatMembers = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState<string | null>(null);
  const [chatId, setchatId] = useState<string | null>(null);

  // Fetch Profile Data
  const profileData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getProfileByToken(undefined)`]
        ?.data as ProfileDataType
  );

  useEffect(() => {
    dispatch(profileApi.endpoints.getProfileByToken.initiate());
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      setId(profileData.userInfo.id);
    }
  }, [profileData]);

  // Fetch Chat Members
  const chatMembers = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getChatDetails-${id}`]?.data as Array<ChatObject>
  );

  useEffect(() => {
    if (id) {
      dispatch(chatApi.endpoints.getChatDetails.initiate(id));
    }
  }, [dispatch, id]);

  // Update chatId dynamically based on chatMembers
  useEffect(() => {
    if (chatMembers?.length > 0) {
      setchatId(chatMembers[0].ChatTable?.id || null);
    }
  }, [chatMembers]);

  // Fetch Member List
  const memberList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMemberList-${chatId}`]?.data as MemberObject
  );

  useEffect(() => {
    if (chatId) {
      dispatch(memberApi.endpoints.getMemberList.initiate(chatId));
    }
  }, [dispatch, chatId]);

  // Loading state
  if (!chatMembers) return <div>Loading chat members...</div>;
  if (!memberList) return <div>Loading member list...</div>;

  return (
    <div>
      <div>
        {chatMembers.map((chatMember, index) => (
          <div key={index}>
            <h1 className="text-black">Chat: {chatMember.ChatTable?.name}</h1>
            <div>
              <h2 className="text-black">Chat Members:</h2>
              <p className="text-black">
                Member ID: {chatMember.ChatMember?.userId}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-black">Members in Chat:</h2>
        {memberList.members.map((member) => (
          <div key={member.id}>
            <p className="text-black">
              User ID: {member.userId}, Is Admin:{" "}
              {member.isAdmin ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-black">Messages:</h2>
      {memberList.messages.map((message) => (
        <div key={message.id}>
          <p className="text-black">Content: {message.content}</p>
          <p className="text-black">Sender: {message.senderId}</p>
          <p className="text-black">Receiver: {message.receiverId}</p>
          <p className="text-black">Type: {message.messageType}</p>
          <p className="text-black">
            Sent At: {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatMembers;
