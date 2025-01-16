"use client";
import { useRouter } from "next/navigation";
import { Search, Plus, UserPen, FileChartColumnIncreasing } from "lucide-react";
import Nav from "../(Components)/Nav";

export default function Rooms() {
  const router = useRouter();

  // Function to handle house click
  const handleHouseClick = () => {
    router.push("/addUser");
  };

  // Function to handle new room click
  const handleNewRoomClick = () => {
    router.push("/createRooms");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white">
        <Nav />
        <div className="border-t">
          <h1 className="text-blue-700 font-bold text-lg ml-8 mt-4">Rooms</h1>
        </div>
      </div>

      {/* Search and New Room */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-[35%]">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search size={18} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleNewRoomClick}
          className="flex items-center bg-green-600 hover:bg-green-700 h-10 px-4 rounded-md text-white"
        >
          <Plus className="mr-2" />
          <span>New Room</span>
        </button>
      </div>

      {/* Room Card */}
      <div className="mx-8 mb-4" onClick={handleHouseClick}>
        <div className="bg-white shadow rounded-md p-4 w-full sm:w-[60%] lg:w-[35%]">
          <div className="flex items-center space-x-4">
            <UserPen className="text-blue-600 h-8 w-8" />
            <div>
              <h1 className="text-black font-semibold text-lg">
                Bishnu Silwal's Room
              </h1>
              <p className="text-gray-500 text-sm">
                No previous session created
              </p>
            </div>
          </div>
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-between items-center">
            <FileChartColumnIncreasing className="text-gray-500 h-8 w-8" />
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
