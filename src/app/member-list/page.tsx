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
import { useToast } from "@/hooks/use-toast";

export default function MemberList() {
  const dispatch = useAppDispatch();
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [joinLink, setJoinLink] = useState<string | null>(null);
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [show, setShow] = useState(false);
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

  // create private room
  const handleCreatePrivateRoom = async (receiverId: string) => {
    try {
      const result = await dispatch(
        memberListApi.endpoints.createPrivateRoom.initiate(receiverId)
      ).unwrap();

      if (result.success) {
        router.push(`/message/${result.chatId}`);
      } else {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }
    } catch (error) {
      console.error("Error creating private room:", error);

      toast({
        title: "Failed to create private room.",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  };

  // create group room
  const handleGroupRoom = async (receiverId: string) => {
    if (!joinLink) {
      toast({
        title: "Please create a room first.",
        description: "",
      });

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
    <>
      <div className="p-4 bg-[#111111] h-screen text-white">
        <div className="p-4 mb-4 flex-grow overflow-y-auto bg-[#222222] w-1/3 border-2 shadow-lg rounded-xl border-gray-400">
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
              className="w-full py-2 px-4 border border-transparent text-sm text-white font-bold bg-green-800 rounded-xl"
            >
              {isLoading ? "Loading..." : "Create Room"}
            </button>
          </form>

          {joinLink && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => router.push(`/message/${joinLink}`)}
                className="text-green-500"
              >
                Go to Room
              </button>
            </div>
          )}
        </div>

        <div className="p-4 flex-grow overflow-y-auto bg-[#222222] w-1/3 border-2 shadow-lg rounded-xl border-gray-400">
          <h3 className="font-bold mb-4 text-xl flex items-center justify-center">
            All Users
          </h3>
          {users.filter((user) => user.id !== loggedInUserId).length === 0 ? (
            <p>No members found.</p>
          ) : (
            users
              .filter((user) => user.id !== loggedInUserId)
              .map((user) => {
                const isMember = groupMembers.includes(user.id);

                return (
                  <div key={user.id} className=" mb-4 ">
                    <div className="ml-4 flex justify-evenly">
                      <h4 className="font-bold">{user.name}</h4>
                      <>
                        <button
                          onClick={() => handleCreatePrivateRoom(user.id)}
                          className="text-blue-400 hover:text-blue-600 ml-10"
                        >
                          <MessageCircle size={20} className="text-green-500" />
                        </button>
                        {!isMember && (
                          <button
                            onClick={() => handleGroupRoom(user.id)}
                            className="text-blue-400 hover:text-blue-600 ml-10"
                          >
                            <Plus size={20} className="text-green-500" />
                          </button>
                        )}
                      </>
                      {isMember && (
                        <p className="ml-10 text-green-400">Joined</p>
                      )}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
}
