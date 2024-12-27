import { FileUp, Plus, UserPen } from "lucide-react";
import React from "react";

export default function AccessUser() {
  return (
    <div className="bg-gray-200 shadow w-[96%] h-full m-8 flex justify-center items-center ">
    <div className="text-center mb-20">
      <div className="flex justify-center">
        <UserPen className="bg-green-300 h-14 w-14 rounded-full p-4 flex items-center justify-center" />
      </div>
      <h1 className="text-xl text-blue-500 mt-2">Time to add some users!</h1>
      <p className="text-lg text-gray-700 mt-2">
        To add new users, click the button below and search or select the users you want to share this room with.
      </p>
      <div className="flex justify-center mt-8">
        <button className="flex p-2 border-[2px] items-center hover:border-blue-700">
          <Plus />
          <p className="text-blue-600 ml-4 text-xl">Share Access</p>
        </button>
      </div>
    </div>
  </div>
  
  );
}
