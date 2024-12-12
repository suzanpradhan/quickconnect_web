"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { RootState } from "@/core/redux/store";
import { GetAllUsersResponse } from "@/modules/member-list/memberListApi";
import { memberListApi } from "@/modules/member-list/memberListType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, X, Search } from "lucide-react"; 
import { apiPaths } from "@/core/api/apiConstants";

export default function MemberList() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const memberList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries["getMemberList-undefined"]?.data as
        | GetAllUsersResponse
        | undefined
  );



  // Fetch member list on mount
  useEffect(() => {
    dispatch(memberListApi.endpoints.getMemberList.initiate());
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // If memberList is undefined, handle the case
  const users = memberList?.users || [];

  return (
    <div className="relative h-screen bg-gray-100">
      <button
        onClick={toggleSidebar}
        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500"
      >
        <User size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-black text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="bg-blue-900 p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">People</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300"
          >
            <X />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-grow overflow-y-auto p-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <h1 className="mt-4">Member List</h1>
          <div className="mt-4">
            {/* Render user list dynamically */}
            {users.length === 0 ? (
              <p>No members found.</p>
            ) : (
              users.map((user) => {

                const avatarSrc =
                  user.avatar
                    ? `${apiPaths.baseUrl}/${user.avatar}`
                    : ""; 

                return (
                  <div key={user.id} className="flex items-center mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={avatarSrc || undefined} 
                        alt={user.name || "Profile Picture"}
                      />
                      <AvatarFallback>
                        {user.name ? user.name[0] : "?"} 
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h4 className="font-bold">{user.name}</h4>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
