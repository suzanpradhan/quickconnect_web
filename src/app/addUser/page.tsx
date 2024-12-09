"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../(Components)/Nav";
import { Copy, FileUp, House } from "lucide-react";
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
          className="m-8 text-blue-600 h-8 w-8 cursor-pointer"
          onClick={handleHouseClick}
        />

        <div className="flex justify-between">
          <div className="m-8">
            <h1 className="text-3xl font-bold font-helvetica">
              Bishnu Silwal's Room
            </h1>
            <p className="text-base text-gray-500">
              Last Session: Friday, December 6, 2024 at 9:53 AM
            </p>
          </div>

          <div className=" flex ">
            <div className="flex m-8  p-2 space-y-1 border-[2px] items-center hover:border-blue-600">
              <Copy className="h-4 w-4" />
              <p className=" text-blue-600 ml-4 text-lg"> Copy Join Link</p>
            </div>
            <div className="flex m-8 bg-blue-800 rounded-md  p-2 border-[1px] items-center">
              <p className=" text-white  text-xl flex justify-center">
                {" "}
                Start Meeting
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex m-8 space-x-6 text-xl text-gray-500">
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
