import { ChevronUp, MessageCircle } from "lucide-react";
const Header = () => {
  return (
    <div className="bg-gray-900/60 text-white p-4 ">
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div>
          <div className="flex flex-wrap items-center gap-4 container w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gray-700 py-1 px-3 rounded-full text-xs sm:text-sm">
                Programming
              </span>
              <span className="bg-gray-700 py-1 px-3 rounded-full text-xs sm:text-sm">
                Python
              </span>
              <span className="bg-blue-600 py-1 px-3 rounded-full text-xs sm:text-sm">
                Week 3
              </span>
              <span className="bg-red-600 py-1 px-3 rounded-full text-xs sm:text-sm flex items-center gap-1">
                <span className="text-[10px] sm:text-xs">🔴</span> Live
              </span>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex items-center mt-2 ">
            <div className=" ">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap ">
                Introduction to Python
              </h1>

              <div className="flex items-center mt-2">
                <img
                  src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Host"
                  className="w-8 h-8 rounded-full border-2 border-blue-500"
                />
                <span className="ml-2 text-sm">
                  Hosted by <strong>Shiva Silwal</strong>
                </span>
              </div>
            </div>

            <div className="flex  mt-8 ml-72 items-center">
              <div className="flex -space-x-2">
                <img
                  src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="User 1"
                  className="w-8 h-8 rounded-full border-2 border-gray-700"
                />
                <img
                  src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="User 2"
                  className="w-8 h-8 rounded-full border-2 border-gray-700"
                />
                <img
                  src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="User 3"
                  className="w-8 h-8 rounded-full border-2 border-gray-700"
                />
              </div>
              <span className="ml-1 text-sm">+24</span>
            </div>
            <button className="bg-gray-700 px-4 py-1 rounded-lg text-sm mt-10 ml-8 ">
              + Add User to Meeting
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center  bg-gray-700   rounded-lg text-sm w-[34%] mt-20 justify-between p-1 mr-2">
          <MessageCircle />
          <button className="">Live Chat</button>
          <ChevronUp />
        </div>
      </div>

      {/* Notification and Profile */}
      {/* <div className="mt-4 flex justify-end items-center gap-4">
        <button className="text-gray-400">🔔</button>
        <button className="text-gray-400">✉️</button>
        <div className="flex items-center gap-2">
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span>James Taulany</span>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
