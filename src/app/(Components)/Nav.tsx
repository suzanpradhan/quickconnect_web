"use client";
import {
  AlignEndVertical,
  ChevronUp,
  ChevronDown,
  User,
  HelpCircle,
  LogOut,
  Key,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { useEffect, useState } from "react";
import profileApi from "@/modules/profile/profileApi";
import { ProfileDataType, ProfileFormValues } from "@/modules/profile/profileType";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/core/redux/store";
import { useFormik } from "formik";
import { apiPaths } from "@/core/api/apiConstants";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(
          profileApi.endpoints.getProfileByToken.initiate()
        );
        console.log("API Response:", response);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
      }
    };
    fetchData();
  }, [dispatch]);

  // Handle file change for avatar upload
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAvatar(file); // Set the selected file in the state
      formik.setFieldValue("avatar", file); // Manually update Formik field value for avatar
    }
  };

  // Form submission for profile update
  const onSubmit = async (values: ProfileFormValues) => {
    console.log("Updating profile with values:", values);
    try {
      const result = await dispatch(
        profileApi.endpoints.updateProfileByToken.initiate({
          name: values.name,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          avatar: avatar ?? null, 
        })
      );

      if ("data" in result) {
        toast({
          title: "Updated profile successfully.",
          description: "Updated profile successfully.",
        });
      } else if ("error" in result) {
        toast({
          variant: "destructive",
          title: "Profile update failed.",
          description: "There was a problem.",
        });
      }
    } catch (error) {
      console.error("An error occurred during profile update:", error);
    }
  };

  // Access profile data from Redux store
  const profileData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getProfileByToken(undefined)`]
        ?.data as ProfileDataType
  );

  // Formik setup for form handling
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profileData?.userInfo?.name ?? "",
      phoneNumber: profileData?.userInfo?.phoneNumber ?? "",
      email: profileData?.userInfo?.email ?? "",
      gender: profileData?.userInfo?.gender ?? "Female",
      avatar: avatar ?? null,
    },
    onSubmit,
    validateOnChange: true,
  });

  // Ensure that avatar is either a valid string or null
  const avatarSrc = avatar
    ? URL.createObjectURL(avatar) // Use avatar file if present
    : profileData?.userInfo?.avatar
    ? `${apiPaths.baseUrl}/${profileData?.userInfo.avatar}`
    : ""; // Fallback to default image if no avatar is available

  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center p-8 space-y-4 sm:space-y-0">
          {/* Left Header */}
          <div className="flex items-center justify-center sm:justify-start">
            <AlignEndVertical className="bg-blue-700 rounded-full text-white text-3xl p-4" />
            <p className="px-4 text-2xl font-bold text-blue-500">
              BigBlueButton
            </p>
          </div>

          {/* Right Header */}
          <div className="relative flex items-center space-x-4 justify-center sm:justify-end">
            {/* User Avatar */}
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarSrc} />
              <AvatarFallback>
                {profileData?.userInfo?.name
                  ? profileData.userInfo.name[0].toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>

            {/* Dynamic Name */}
            <p className="text-lg text-gray-500">
              {profileData?.userInfo?.name || "Guest"}
            </p>

            {/* Dropdown Toggle */}
            {isDropdownOpen ? (
              <ChevronUp
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              />
            ) : (
              <ChevronDown
                className="text-gray-500 cursor-pointer"
                onClick={() => setIsDropdownOpen(true)}
              />
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10">
                <ul className="py-2 text-sm text-gray-700">
                  <li className="flex items-center px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    <User className="mr-2 text-gray-500" size={18} />
                    Profile
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    <HelpCircle className="mr-2 text-gray-500" size={18} />
                    Help Center
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-300 cursor-pointer">
                    <Key className="mr-2 text-gray-500" size={18} />
                    Reset
                  </li>
                  <li className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-800 cursor-pointer rounded-md">
                    <LogOut className="mr-2 text-white" size={18} />
                    <p className="text-white">Sign Out</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
