import { Users, Building2, UserCircle } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <div className=" bg-gray-800 p-6">
        <h1 className="text-[#169AD6] font-helvetica font-bold mb-20">
          QuickConnect
        </h1>

        <div className="space-y-4">
          {/* Rooms */}
          <div className="flex items-center gap-4">
            <Users className="w-6 h-6 text-blue-500" />
            <Link
              href="/rooms"
              className="w-full text-left p-2 rounded bg-blue-500 flex items-center hover:bg-blue-600"
            >
              <span>Rooms</span>
            </Link>
          </div>

          {/* Organization */}
          <div className="flex items-center gap-4">
            <Building2 className="w-6 h-6 text-gray-400" />
            <Link
              href="/organization"
              className="w-full text-left p-2 rounded flex items-center hover:bg-gray-700"
            >
              <span>Organization</span>
            </Link>
          </div>

          {/* My Account */}
          <div className="flex items-center gap-4">
            <UserCircle className="w-6 h-6 text-gray-400" />
            <Link
              href="/my-account"
              className="w-full text-left p-2 rounded flex items-center hover:bg-gray-700"
            >
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
