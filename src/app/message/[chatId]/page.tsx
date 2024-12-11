"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { MessageType } from "@/modules/message/messageType";
import { messageApi } from "@/modules/message/messageApi";

export default function MessagePage() {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();

  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;

  const messageList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMessages-${chatIdString}`]?.data as MessageType[]
  );

  useEffect(() => {
    if (chatIdString) {
      dispatch(messageApi.endpoints.getMessages.initiate(chatIdString));
    }
  }, [dispatch, chatIdString]); 

  return (
    <div>
      <h2>Messages for Chat ID: {chatIdString}</h2>
      {messageList ? (
        <ul>
          {messageList.map((message: MessageType) => (
            <li key={message.id}>
              <div>
                <strong>{message.senderId}</strong>: {message.message}
                <span>{message.createdAt}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No messages available.</div>
      )}
    </div>
  );
}
