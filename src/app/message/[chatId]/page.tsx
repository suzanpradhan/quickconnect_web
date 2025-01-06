"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { messageApi } from "@/modules/message/messageApi";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import {
  Phone,
  Search,
  Send,
  Trash2,
  Users,
  Video,
  File,
  FileVideo2,
  Plus,
  MessageCircle,
} from "lucide-react";
import { socket } from "@/config/socket";
import { useFormik } from "formik";
import { string, ZodError } from "zod";
import {
  CreateMessageSchema,
  SendMessageValues,
} from "@/modules/message/messageType";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { PaginatedResponseType, MessageType } from "@/core/types/responseTypes";
import { GetAllUsersResponse } from "@/modules/member-list/memberListApi";
import { memberListApi } from "@/modules/member-list/memberListType";
import { roomMembersApi } from "@/modules/room-members/roomMemberApi";

export default function MessagePage() {
  const [animatingUser, setAnimatingUser] = useState<string | null>(null);
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const chatIdString = Array.isArray(chatId) ? chatId[0] : chatId;
  const session = useSession();
  const userId = session?.data?.user?.id;
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [messages, setMessages] = useState<MessageType[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const limit = 10;
  // const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const scrollableDivRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messageData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getMessages-${chatIdString}`]
        ?.data as PaginatedResponseType<MessageType>
  );

  console.log("here", messageData);

  // Fetch Messages with Pagination
  // const fetchMessages = useCallback(async () => {
  //   if (isLoading || !hasMoreData) return;

  //   try {
  //     const response = await dispatch(
  //       messageApi.endpoints.getMessages.initiate({
  //         chatId: chatIdString || "",
  //         limit,
  //         page,
  //       })
  //     ).unwrap();

  //     if (response?.messages?.length > 0) {
  //       setMessages((prevMessages) => [...response.messages, ...prevMessages]);
  //     }

  //     if (response.pagination.page >= response.pagination.totalPages) {
  //       setHasMoreData(false);
  //     }
  //   } catch (error) {
  //     // console.error("Error fetching messages:", error);
  //   }
  // }, [chatId, dispatch, hasMoreData, isLoading, limit, page]);

  const handleScroll = useCallback(async () => {
    const scrollableDiv = scrollableDivRef.current;

    if (scrollableDiv.scrollTop <= 10 && !isLoading) {
      setPage((prevPage) => prevPage + 1);
      console.log("scrollTop", page);
    }
  }, [isLoading]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const fetchData = async (page: number) => {
      console.log("page", page);
      const response = await Promise.resolve(
        dispatch(
          messageApi.endpoints.getMessages.initiate({
            chatId: chatIdString || "",
            limit,
            page,
          })
        )
      );
      // if (response.data) {
      //   if (response.data!.page >= response.data!.totalPages) {
      //     setHasMoreData(false);
      //   }
      //   console.log("DATA", response.data);
      // }
    };

    if (messageData ? messageData?.page >= messageData?.totalPages : true) {
      setIsLoading(true);
      fetchData(page);
      setIsLoading(false);
    }
  }, [page, dispatch]);

  // join the chat room when the mounts
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

      // console.log("Received message:", data);

      dispatch(
        messageApi.util.updateQueryData(
          "getMessages",
          { chatId: chatIdString, limit: limit, page: page },
          (draft) => {
            draft.messages.push({
              id: Date.now().toString(),
              senderId: data.senderId,
              name: data.name,
              message: data.message,
              createdAt: data.timestamp,
              chatId: chatIdString,
              receiverId: "",
              messageType: "text",
              attachmentURL: null,
              mediaType: null,
            });
          }
        )
      );
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
  }, [chatIdString, dispatch]);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      // Direct scroll without animation
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messageData]);

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
          ).unwrap();

          // Ensure the response is of type MessageType
          // if (response) {
          //   dispatch(
          //     messageApi.util.updateQueryData(
          //       "getMessages",
          //       {
          //         chatId: chatIdString || "",
          // limit: parseInt(limit),
          // page: page,
          //       },
          //       (draft) => {
          //         draft.messages.push(response as MessageType);
          //       }
          //     )
          //   );
          // } else {
          //   console.error("API failed to send the message.");
          // }
        }

        resetForm(); // Reset the form after submitting
      } catch (error) {
        console.error("Error sending message:", error);
        // Optional: Display an error message to the user.
      } finally {
        setIsSending(false);
      }
    },
  });

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
          { chatId, limit, page },
          (draft) => {
            const index = draft.messages.findIndex(
              (msg) => msg.id === messageId
            );
            if (index !== -1) {
              draft.messages.splice(index, 1);
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

  //member list on group room
  const memberList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries["getMemberList-undefined"]?.data as
        | GetAllUsersResponse
        | undefined
  );

  useEffect(() => {
    dispatch(memberListApi.endpoints.getMemberList.initiate());
  }, [dispatch]);

  const toggleMemberList = () => {
    setShowMembers((prev) => !prev);
  };

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

  const handleGroupRoom = async (receiverId: string) => {
    try {
      const result = await dispatch(
        memberListApi.endpoints.createGroupRoom.initiate({
          chatId: chatIdString || "",
          receiverId,
        })
      ).unwrap();

      if (result.message) {
        alert(result.message);
      } else {
        setError("Failed to join the group.");
      }
    } catch (error) {
      console.error("Error creating group room:", error);
      setError("Failed to join the group.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-full  shadow-lg bg-[#1b1b1d] border-gray-300 flex flex-col z-40">
        <div className="p-4 bg-[#242526] text-white text-lg font-semibold flex justify-between">
          <div className="font-medium">{chatRoomName}</div>
          <div className="flex space-x-4 text-white text-4xl ">
            <Video />
            <Phone />
            <Search />
            {isGroupChat && (
              <Users
                onClick={toggleMemberList}
                className="cursor-pointer hover:text-blue-500"
              />
            )}
          </div>
        </div>

        {showMembers && (
          <div className="absolute top-16 right-4 bg-[#222222] shadow-lg text-white rounded-xl w-64 z-50">
            <h3 className="text-lg font-semibold text-white p-4 bg-[#2c2929]">
              Members
            </h3>

            <ul className="max-h-64 overflow-y-auto">
              {memberList?.users.map((user) => {
                const isAlreadyMember = roomMembers?.members.some(
                  (member) => member.userId === user.id
                );

                const isLoginUser = user.id === userId;

                return (
                  <li key={user.id} className="">
                    <div className="ml-4 flex justify-between items-center">
                      <h4 className="font-bold">{user.name}</h4>
                      {isLoginUser ? (
                        <p className="text-green-400 ml-10">Admin</p>
                      ) : isAlreadyMember ? (
                        <p className="text-green-400 ml-10">Joined</p>
                      ) : (
                        <button
                          onClick={() => handleGroupRoom(user.id)}
                          className="text-blue-400 hover:text-blue-600 ml-10"
                        >
                          <Plus size={20} className="text-green-500" />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div
          className="flex-grow overflow-y-auto p-4 space-y-3"
          ref={scrollableDivRef}
          onScroll={handleScroll}
        >
          {messageData &&
          Array.isArray(messageData.messages) &&
          messageData.messages.length > 0 ? (
            messageData.messages.map((message) => {
              const isUserMessage =
                session?.data?.user?.id === message.senderId;
              return (
                <div
                  key={message.id}
                  className={`relative flex ${
                    isUserMessage ? "justify-end" : "justify-start"
                  } `}
                >
                  <div>
                    {!isUserMessage && <Avatar className="w-8 h-8 mr-2" />}
                    <div
                      className={`group max-w-xs break-words p-3 rounded-lg shadow-md ${
                        isUserMessage
                          ? "bg-blue-300 text-black"
                          : " bg-white text-black"
                      }`}
                    >
                      <p className="font-bold text-green-700">
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
                        {formatTimestamp(message.createdAt)}
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
          className="p-4 border-gray-300 bg-[#1E1E1E] flex items-center"
        >
          <Popover>
            <PopoverTrigger>
              <Plus className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500" />
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-[#282A36] text-white rounded-lg shadow-lg w-40 border-2 border-none">
              <div className="flex flex-col ">
                <div className="flex justify-evenly hover:bg-gray-600  p-2 cursor-pointer">
                  <File className="text-blue-600" />
                  <p>Files</p>
                </div>

                <div className="flex justify-evenly mt-4 hover:bg-gray-600 p-2 cursor-pointer">
                  <FileVideo2 className="text-blue-600" />
                  <p>Videos</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <textarea
            id="message"
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 text-white bg-[#222222] rounded-lg focus:outline-none resize-none"
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
