import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Users,
  Building2,
  UserCircle,
  AlignJustify,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="min-h-screen bg-[#222222]  relative">
      <Sheet>
        <SheetTrigger asChild>
          <button className="text-white p-2 fixed top-4 left-4 z-50">
            <AlignJustify className="w-6 h-6" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="bg-[#222222] w-64 h-full fixed shadow-lg z-50 border-none"
        >
          <SheetHeader>
            <SheetTitle className="text-[#169AD6] p-4 py-8">
              QuickConnect
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-4 p-4">
            {/* Rooms */}
            <div className="flex items-center gap-4 w-full text-left p-2 rounded bg-blue-500 hover:bg-blue-600 text-white">
              <Users className="w-6 h-6 text-white" />
              <Link href="/table-list">
                <span>Rooms</span>
              </Link>
            </div>

            {/* Organization */}
            <div className="flex items-center gap-4">
              <Building2 className="w-6 h-6 text-white" />
              <Link
                href="/organization"
                className="w-full text-left p-2 rounded flex items-center hover:bg-gray-700"
              >
                <span className="text-white">Organization</span>
              </Link>
            </div>

            {/* My Account */}
            <div className="flex items-center gap-4">
              <UserCircle className="w-6 h-6 text-white" />
              <Link
                href="/profile"
                className="w-full text-left p-2 rounded flex items-center hover:bg-gray-700"
              >
                <span className="text-white">My Account</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <MessageCircleMore className="w-6 h-6 text-white" />
              <Link
                href="/member-list"
                className="w-full text-left p-2 rounded flex items-center hover:bg-gray-700"
              >
                <span className="text-white">Messsage</span>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="p-8 relative"></div>
    </div>
  );
}
