"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { MessageType } from "@/modules/message/messageType";
import { messageApi } from "@/modules/message/messageApi";
import { useSession } from "next-auth/react";

export default function MessagePage() {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  const session = useSession();
  const [newMessage, setNewMessage] = useState<string>(""); 
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  // Select message list from Redux store
  const messageList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMessages-${chatIdString}`]?.data as MessageType[]
  );

  // Fetch messages when chatId changes
  useEffect(() => {
    if (chatIdString) {
      dispatch(messageApi.endpoints.getMessages.initiate(chatIdString));
    }
  }, [dispatch, chatIdString]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!chatIdString || !session.data?.user?.accessToken) {
      setErrorMessage("Missing chatId or token.");
      return;
    }

    if (!newMessage.trim()) {
      setErrorMessage("Message cannot be empty.");
      return;
    }

    try {
      setIsSending(true);
      setErrorMessage("");

      await dispatch(
        messageApi.endpoints.sendMessage.initiate({
          chatId: chatIdString,
          message: newMessage,
          token: session.data?.user?.accessToken,
          // senderName: session?.data?.user?.name || "Unknown User", 

        })
      ).unwrap();

      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Messages for Chat ID: {chatIdString}</h2>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 mb-4 p-2 border border-red-500 rounded">{errorMessage}</div>
      )}

      {/* Message List */}
      {messageList && messageList.length > 0 ? (
        <ul className="space-y-4">
          {messageList.map((message: MessageType) => (
            <li key={message.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
              <div>
                <strong className="font-bold">
                  {message.senderId} 
                </strong>
                : {message.message}
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-600">No messages available.</div>
      )}

      {/* Input to Send Message */}
      <div className="mt-8">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          onClick={handleSendMessage}
          disabled={isSending}
          className={`mt-4 w-full p-3 rounded-md text-white ${isSending ? "bg-gray-500" : "bg-blue-600"} hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed`}
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </div>
  );
}

