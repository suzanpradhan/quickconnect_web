"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { MessageType } from "@/modules/message/messageType";
import { messageApi } from "@/modules/message/messageApi";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

export default function MessagePage() {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  const session = useSession();
  const [newMessage, setNewMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messageList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMessages-${chatIdString}`]
        ?.data as MessageType[]
  );

  useEffect(() => {
    if (chatIdString) {
      dispatch(messageApi.endpoints.getMessages.initiate(chatIdString));
    }
  }, [dispatch, chatIdString]);

  const handleSendMessage = async () => {
    if (
      !chatIdString ||
      !session.data?.user?.accessToken ||
      !newMessage.trim()
    ) {
      return;
    }

    try {
      await dispatch(
        messageApi.endpoints.sendMessage.initiate({
          chatId: chatIdString,
          message: newMessage,
          token: session.data.user.accessToken,
          name: session.data.user.name || "Unknown User",
        })
      ).unwrap();

      setNewMessage("");
      scrollToBottom();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Icon */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute right-0 top-0 w-1/3 h-full bg-white shadow-lg border-l border-gray-300 flex flex-col z-40">
          <div className="p-4 bg-blue-600 text-white text-lg font-semibold">
            Chat Messages
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messageList && messageList.length > 0 ? (
              messageList.map((message: MessageType) => {
                const isUserMessage =
                  session?.data?.user?.id &&
                  message.senderId === session.data.user.id;

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUserMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUserMessage && (
                      <Avatar className="w-8 h-8 mr-2">
                        {/* Avatar Placeholder */}
                      </Avatar>
                    )}
                    <div
                      className={`max-w-xs break-words p-3 rounded-lg shadow-md ${
                        isUserMessage
                          ? "bg-blue-600 text-white self-end"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p className="font-medium">
                        {isUserMessage
                          ? "You"
                          : message.name || "Unknown Sender"}
                      </p>
                      <p>{message.message}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-600 text-center">
                No messages available.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-300 bg-gray-50 flex items-center">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              rows={1}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none overflow-hidden"
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
            />
            {newMessage.trim() && (
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              >
                Send
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
