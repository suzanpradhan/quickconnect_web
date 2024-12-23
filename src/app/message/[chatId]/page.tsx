"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { messageApi } from "@/modules/message/messageApi";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Trash2 } from "lucide-react";
import { socket } from "@/config/socket";
import { useFormik } from "formik";
import { string, ZodError } from "zod";
import {
  CreateMessageSchema,
  MessageType,
  SendMessageValues,
} from "@/modules/message/messageType";

export default function MessagePage() {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  const session = useSession();
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch the messages for the current chatId from Redux
  const messageList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMessages-${chatIdString}`]?.data as
        | MessageType[]
        | undefined
  );

  // Fetch messages when chatId changes
  useEffect(() => {
    if (chatIdString) {
      dispatch(messageApi.endpoints.getMessages.initiate(chatIdString));
    }
  }, [dispatch, chatIdString]);

  useEffect(() => {
    if (!chatIdString || !socket) return;

    const handleConnect = () => {
      console.log("Socket connected:", socket.connected);
      socket.emit("joinChat", chatIdString);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected:", socket.connected);
    };

    const handleReceiveMessage = (data: {
      senderId: string;
      name: string;
      message: string;
      timestamp: string;
    }) => {
      if (!data || !data.message) {
        console.error("Invalid message received:", data);
        return;
      }

      console.log("Received message:", data);

      dispatch(
        messageApi.util.updateQueryData(
          "getMessages",
          chatIdString,
          (draft) => {
            draft.push({
              id: Date.now().toString(),
              senderId: data.senderId,
              name: data.name,
              message: data.message,
              timestamp: data.timestamp,
              chatId: chatIdString,
              receiverId: "",
              messageType: "text",
              attachmentURL: null,
              mediaType: null,
            });
          }
        )
      );
      scrollToBottom();
    };

    // Setup socket listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup socket listeners when the component unmounts
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("receiveMessage", handleReceiveMessage);
      // socket.off("deleteMessage", handleDeleteClick);
    };
  }, [chatIdString, dispatch, socket]);

  // Scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const formik = useFormik<SendMessageValues>({
    initialValues: {
      chatId: chatIdString || "",
      message: "",
    },
    validate: (values) => {
      try {
        CreateMessageSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    },
    onSubmit: async (values, { resetForm }) => {
      if (isSending || !session.data?.user?.id) return;

      try {
        setIsSending(true);

        if (socket.connected) {
          // Socket is connected; emit the message directly
          console.log("Socket is connected, emitting message...");
          socket.emit("sendMessage", {
            chatId: chatIdString,
            message: values.message.trim(),
            senderId: session.data.user.id,
            name: session.data.user.name || "Unknown",
          });
        } else {
          // Socket is not connected; fallback to API
          console.log("Socket is not connected, using API...");
          const response = await dispatch(
            messageApi.endpoints.sendMessage.initiate({
              chatId: chatIdString || "",
              message: values.message.trim(),
              senderId: session.data.user.id,
            })
          );

          if (!response) {
            console.error("API failed to send the message.");
            return;
          }
        }

        resetForm(); // Reset the form after submitting
        scrollToBottom(); // Scroll to the latest message
      } catch (error) {
        console.error("Error sending message:", error);
        // Optional: Display an error message to the user.
      } finally {
        setIsSending(false);
      }
    },
  });

  // socket.on("deleteMessage", handleDeleteClick);
  // socket.emit("deleteMessage", handleDeleteClick);

  const handleDeleteClick = async (messageId: string, chatId: string) => {
    try {
      if (!messageId || !chatId) {
        console.error(
          "messageId and chatId are required to delete the message."
        );
        return;
      }

      await dispatch(
        messageApi.endpoints.deleteMessage.initiate({ messageId, chatId })
      ).unwrap();

      dispatch(
        messageApi.util.updateQueryData(
          "getMessages",
          chatIdString || "",
          (draft: MessageType[]) => {
            const index = draft.findIndex((msg) => msg.id === messageId);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          }
        )
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="absolute top-4 right-4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 z-50">
        <MessageSquare size={24} />
      </div>

      <div className="w-full h-full bg-white shadow-lg border-l border-gray-300 flex flex-col z-40">
        <div className="p-4 bg-blue-600 text-white text-lg font-semibold">
          Chat Messages
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {messageList && messageList.length > 0 ? (
            messageList.map((message) => {
              const isUserMessage =
                session?.data?.user?.id === message.senderId;
              return (
                <div
                  key={message.id}
                  className={`relative flex ${
                    isUserMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUserMessage && <Avatar className="w-8 h-8 mr-2" />}
                  <div
                    className={`group max-w-xs break-words p-3 rounded-lg shadow-md ${
                      isUserMessage
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p className="font-medium">
                      {isUserMessage ? "You" : message.name || "Unknown"}
                    </p>
                    <p>{message.message}</p>

                    <p className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>

                    {/* Delete Icon */}
                    {isUserMessage && (
                      <button
                        className="absolute top-2 right-2 hidden group-hover:block text-white bg-red-600 rounded-full p-1 hover:bg-red-700"
                        onClick={() => {
                          if (
                            typeof message.id === "string" &&
                            typeof chatId === "string"
                          ) {
                            handleDeleteClick(message.id, chatId);
                          } else {
                            console.error("Invalid message ID or chat ID.");
                          }
                        }}
                        title="Delete Message"
                      >
                        <Trash2 />
                      </button>
                    )}
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

        <form
          onSubmit={formik.handleSubmit}
          className="p-4 border-t border-gray-300 bg-gray-50 flex items-center"
        >
          <textarea
            id="message"
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none resize-none"
            rows={2}
            {...formik.getFieldProps("message")}
          />
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting || isSending}
            className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
