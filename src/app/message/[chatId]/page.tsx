"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { messageApi } from "@/modules/message/messageApi";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";

import {
  EllipsisVertical,
  MessageSquare,
  Phone,
  Search,
  Send,
  Trash2,
  Users,
  Video,
} from "lucide-react";
import { socket } from "@/config/socket";
import { useFormik } from "formik";
import { string, ZodError } from "zod";
import {
  CreateMessageSchema,
  MessageType,
  SendMessageValues,
} from "@/modules/message/messageType";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChatObject } from "@/modules/table-list/tableListType";
import { chatApi } from "@/modules/table-list/tableListApi";

export default function MessagePage() {
  const { chatId } = useParams();

  const dispatch = useAppDispatch();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  const session = useSession();
  const userId = session?.data?.user?.id;
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  // Helper function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();

    // If the message is from today, show the time (hour and minute)
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // If the message is from another day, show the full date
    return messageDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // get room name
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

  const chatRoom = roomList?.find(
    (room) => room.chat_table.id === chatIdString
  );
  const chatRoomName = chatRoom?.chat_table.name || "Unknown Room";
  const isGroupChat = chatRoom?.chat_table.isGroupChat;

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-full bg-[#1E1E1E]/85 shadow-lg border-gray-300 flex flex-col z-40">
        <div className="p-4 bg-blue-600 text-white text-lg font-semibold flex justify-between">
          <div className="font-medium">{chatRoomName}</div>
          <div className="flex space-x-4">
            {isGroupChat && <Users />}
            <Video />
            <Phone />
            <Search />
          </div>
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
                  <div>
                    {!isUserMessage && <Avatar className="w-8 h-8 mr-2" />}
                    <div
                      className={`group max-w-xs break-words p-3 rounded-lg shadow-md ${
                        isUserMessage
                          ? "bg-[#6b9b9c] text-black"
                          : " bg-white text-black"
                      }`}
                    >
                      <p className="font-bold">
                        {isUserMessage ? "" : message.name}
                      </p>

                      <div className=" flex">
                        {/* Delete Icon for user messages */}
                        {isUserMessage && (
                          <div className="relative group">
                            <button
                              className="absolute top-2 right-2 hidden group-hover:block text-white  rounded-full p-1"
                              onClick={() => setShowDeleteDialog(true)} // Show the confirmation dialog
                              title="Delete Message"
                            >
                              <Trash2 />
                            </button>

                            {/* Alert Dialog for Delete Confirmation */}
                            {showDeleteDialog && (
                              <AlertDialog
                                open={showDeleteDialog}
                                onOpenChange={setShowDeleteDialog}
                              >
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Confirm Delete
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      message? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                      onClick={() => setShowDeleteDialog(false)} // Close the dialog on cancel
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                      onClick={() => {
                                        if (
                                          typeof message.id === "string" &&
                                          typeof chatId === "string"
                                        ) {
                                          handleDeleteClick(message.id, chatId);
                                          setShowDeleteDialog(false); // Close the dialog after deleting
                                        } else {
                                          console.error(
                                            "Invalid message ID or chat ID."
                                          );
                                        }
                                      }}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        )}
                        <div className="">
                          <p>{message.message}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600">
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
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
          className="p-4  border-gray-300 bg-[#1E1E1E]   flex items-center"
        >
          <textarea
            id="message"
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300  text-white  bg-[#222222] rounded-lg focus:outline-none resize-none"
            rows={2}
            {...formik.getFieldProps("message")}
          />
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting || isSending}
            className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
          >
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}
