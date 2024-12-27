"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../(Components)/Nav";
import { Copy, FileUp, House, Plus } from "lucide-react";
import UploadFile from "../(Components)/UploadFile";
import AccessUser from "../(Components)/AccessUser";
import Setting from "../(Components)/Setting";

export default function AddUser() {
  const [activeTab, setActiveTab] = useState("presentation");
  const router = useRouter();

  const handleHouseClick = () => {
    router.push("/rooms");
  };
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white shadow">
        <Navbar />
        <House
          className="m-8 text-blue-600 h-8 w-8 cursor-pointer max-sm:m-auto max-sm:flex max-sm:justify-center"
          onClick={handleHouseClick}
        />

        <div className="sm:flex sm:justify-between grid columns-1">
          <div className="sm:m-8 m-2">
            <h1 className="text-base sm:text-2xl font-bold font-helvetica whitespace-nowrap">
              Bishnu Silwal's Room
            </h1>
            <p className="text-xs sm:text-base text-gray-500 whitespace-nowrap">
              Last Session: Friday, December 6, 2024 at 9:53 AM
            </p>
          </div>
          <div className="sm:flex sm:space-x-4 space-y-2 sm:space-y-0">
            <button className="flex items-center bg-green-600 hover:bg-green-700 h-10 px-4 rounded-md text-white">
              <Plus className="mr-2" />
              <span>New Room</span>
            </button>

            <button className="flex items-center bg-green-600 hover:bg-green-700 h-10 px-4 rounded-md text-white">
              <Plus className="mr-2" />
              <span>New Room</span>
            </button>
          </div>
        </div>
        <div>
          <div className="flex m-2 sm:8 space-x-6 sm:text-xl text-base text-gray-500">
            <h1
              className={activeTab === "presentation" ? "text-blue-500" : ""}
              onClick={() => setActiveTab("presentation")}
            >
              Presentation
            </h1>
            <h1
              className={activeTab === "access" ? "text-blue-500" : ""}
              onClick={() => setActiveTab("access")}
            >
              Access
            </h1>
            <h1
              className={activeTab === "setting" ? "text-blue-500" : ""}
              onClick={() => setActiveTab("setting")}
            >
              Setting
            </h1>
          </div>
        </div>
      </div>

      {activeTab === "presentation" && (
        <div className="h-72">
          <UploadFile />
        </div>
      )}

      {activeTab === "access" && (
        <div className="h-72">
          <AccessUser />
        </div>
      )}

      {activeTab === "setting" && (
        <div className="h-72">
          <Setting />
        </div>
      )}
    </div>
  );
}
