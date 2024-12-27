"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { GetAllUsersResponse } from "@/modules/member-list/memberListApi";
import { memberListApi } from "@/modules/member-list/memberListType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, X, Search, MessageCircle, Plus } from "lucide-react";
import { apiPaths } from "@/core/api/apiConstants";
import { useRouter } from "next/navigation";
import { CreateRoomSchema, CreateRoomValues } from "@/modules/rooms/roomstype";
import { ZodError } from "zod";
import roomApi from "@/modules/rooms/roomsApi";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

export default function MemberList() {
  const dispatch = useAppDispatch();
  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [joinLink, setJoinLink] = useState<string | null>(null);
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const loggedInUserId = session.data?.user?.id;

  const validateForm = (values: CreateRoomValues) => {
    try {
      CreateRoomSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
        return error.formErrors.fieldErrors;
      }
    }
  };
  //create room link for group
  const onSubmit = async (values: CreateRoomValues) => {
    try {
      setIsLoading(true);
      const result = await dispatch(
        roomApi.endpoints.createRoom.initiate(values)
      ).unwrap();

      if (result.chatId) {
        setJoinLink(result.chatId);
        console.log("Generated Join Link:", result.chatId);
      } else {
        console.log("Error when creating room");
      }
    } catch (error) {
      console.error("An error occurred during Create Rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const memberList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries["getMemberList-undefined"]?.data as
        | GetAllUsersResponse
        | undefined
  );

  useEffect(() => {
    dispatch(memberListApi.endpoints.getMemberList.initiate());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // create private room
  const handleCreatePrivateRoom = async (receiverId: string) => {
    try {
      const result = await dispatch(
        memberListApi.endpoints.createPrivateRoom.initiate(receiverId)
      ).unwrap();

      if (result.success) {
        router.push(`/message/${result.chatId}`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error creating private room:", error);
      alert("Failed to create private room.");
    }
  };

  // create group room
  const handleGroupRoom = async (receiverId: string) => {
    if (!joinLink) {
      alert("Please create a room first.");
      return;
    }

    try {
      const result = await dispatch(
        memberListApi.endpoints.createGroupRoom.initiate({
          chatId: joinLink,
          receiverId,
        })
      ).unwrap();

      if (result.message) {
        alert(result.message);
        //This ensures the new member is appended to the existing array (prev)
        setGroupMembers((prev) => [...prev, receiverId]);
      } else {
        alert("Failed to join the group.");
      }
    } catch (error) {
      console.error("Error creating group room:", error);
      alert("Failed to join the group.");
    }
  };
  // generate group room form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      chatName: "",
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
  });

  const users = memberList?.users || [];

  return (
    <div className="relative h-screen bg-gray-100">
      <button
        onClick={toggleSidebar}
        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500"
      >
        <User size={24} />
      </button>

      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-black text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg flex flex-col`}
      >
        <div className="bg-blue-900 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">People</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
          >
            <X />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Create Rooms</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <Input
              className="text-white focus:outline-none"
              placeholder="Enter Room Name"
              type="text"
              error={
                formik.touched.chatName ? formik.errors.chatName : undefined
              }
              {...formik.getFieldProps("chatName")}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent text-sm text-white font-bold bg-[#169AD6] rounded-xl"
            >
              {isLoading ? "Loading..." : "Create Room"}
            </button>
          </form>

          {joinLink && (
            <div className="mt-4">
              <p>Room Created</p>
              <button
                onClick={() => router.push(`/message/${joinLink}`)}
                className="text-blue-500"
              >
                Go to Room
              </button>
            </div>
          )}
        </div>

        <div className="p-4 flex-grow overflow-y-auto">
          <h3 className="font-bold mb-4">Member List</h3>
          {users.length === 0 ? (
            <p>No members found.</p>
          ) : (
            users.map((user) => {
              const isMember = groupMembers.includes(user.id);
              const isCurrentUser = user.id === loggedInUserId;

              return (
                <div key={user.id} className="flex items-center mb-4">
                  <div className="ml-4 flex justify-between">
                    <h4 className="font-bold">{user.name}</h4>
                    {!isCurrentUser && (
                      <>
                        <button
                          onClick={() => handleCreatePrivateRoom(user.id)}
                          className="text-blue-400 hover:text-blue-600 ml-10"
                        >
                          <MessageCircle size={20} />
                        </button>
                        {!isMember && (
                          <button
                            onClick={() => handleGroupRoom(user.id)}
                            className="text-blue-400 hover:text-blue-600 ml-10"
                          >
                            <Plus size={20} />
                          </button>
                        )}
                      </>
                    )}
                    {isMember && <p className="ml-10 text-green-400">Joined</p>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
