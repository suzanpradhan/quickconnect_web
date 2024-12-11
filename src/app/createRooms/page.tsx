"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { useAppDispatch } from "@/core/redux/clientStore";
import { useFormik } from "formik";
import { CreateRoomSchema, CreateRoomValues } from "@/modules/rooms/roomstype";
import { Input } from "@/components/ui/input";
import roomApi from "@/modules/rooms/roomsApi";

export default function CreateRooms() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [joinLink, setJoinLink] = useState<string | null>(null);

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

  const onSubmit = async (values: CreateRoomValues) => {
    try {
      setIsLoading(true);
      const result = await dispatch(
        roomApi.endpoints.createRoom.initiate(values)
      );
      if (result.data && result.data.chatId) {
        const chatId = result.data.chatId;
        const link = `${window.location.origin}/join-room/${chatId}`;
        setJoinLink(link);

        console.log("Generated Join Link:", link);
      } else if (result.error) {
        console.error("Error creating room:", result.error);
      }
    } catch (error) {
      console.error("An error occurred during Create Rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCopyLink = () => {
    if (joinLink) {
      navigator.clipboard.writeText(joinLink);
      alert("Link copied to clipboard!");
    }
  };

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      chatName: "",
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
  });

  return (
    <div className="flex h-screen">
      <div className="space-y-8 text-center justify-center flex">
        <div className="ml-96 mt-60">
          <h2 className="text-black flex font-bold">
            Create Rooms
          </h2>

          <form
            className="flex flex-col items-end w-80 gap-4 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <Input
              className="text-black focus:outline-none"
              placeholder="Enter Your Name"
              type="text"
              error={
                formik.touched.chatName ? formik.errors.chatName : undefined
              }
              {...formik.getFieldProps("chatName")}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm text-black bg-[#169AD6] font-helvetica font-normal rounded-xl"
            >
              {isLoading ? "Loading..." : "Create Room"}
            </button>
          </form>
        </div>

        {joinLink && (
          <div className="mt-4">
            <p>Room Created! Here is your link:</p>
            <a
              href={joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {joinLink}
            </a>
            <button
              onClick={handleCopyLink}
              className="ml-4 px-4 py-2 bg-green-500 text-white  rounded-2xl"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}







