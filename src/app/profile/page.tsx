"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { profileApi } from "@/modules/profile/profileApi";
import { RootState } from "@/core/redux/store";
import {
  ProfileFormValues,
  ProfileDataType,
  profileSchema,
} from "@/modules/profile/profileType";
import Link from "next/link";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { File } from "lucide-react";
import { apiPaths } from "@/core/api/apiConstants";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const [pageIndex] = useState(1);
  const genders = ["Male", "Female", "Others"];
  const [avatar, setAvatar] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(
          profileApi.endpoints.getProfileByToken.initiate(pageIndex)
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
  }, [dispatch, pageIndex]);

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
          avatar: avatar ?? null, // Send avatar if available, else null
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
      state.baseApi.queries[`getProfileByToken(${pageIndex})`]
        ?.data as ProfileDataType
  );

  // Formik setup for form handling
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profileData?.user.name ?? "",
      phoneNumber: profileData?.user.phoneNumber ?? "9861209638",
      email: profileData?.user.email ?? "",
      gender: profileData?.user.gender ?? "Female",
      avatar: avatar ?? null, // Handle avatar initialization
    },
    onSubmit,
    validateOnChange: true,
  });

  // Ensure that avatar is either a valid string or null
  const avatarSrc = avatar
    ? URL.createObjectURL(avatar) // Use avatar file if present
    : profileData?.user.avatar
    ? `${apiPaths.baseUrl}/${profileData?.user.avatar}`
    : ""; // Fallback to default image if no avatar is available
  console.log("avatar", avatarSrc);
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">My Profile</h2>
        <div className="flex gap-8">
          <div className="bg-gray-800 p-6 rounded-md w-1/4 h-48 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden relative group">
              <Avatar className="w-full h-full">
                <AvatarImage src={avatarSrc} alt="Profile Picture" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar"
                className="absolute top-0 right-0 p-1 bg-gray-700 rounded-full text-blue-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <File className="w-6 h-6" />
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <p className=" text-base sm:text-sm md:text-base lg:text-lg  font-bold">
              {profileData?.user.name}
            </p>

            <p className="text-gray-400">{profileData?.user.phoneNumber}</p>
          </div>

          {/* Form Section */}
          {/* <div className="bg-gray-800 p-6 rounded-md w-2/3">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Full Name
                  </label>
                  <Input
                    className="text-white"
                    placeholder="name"
                    type="text"
                    {...formik.getFieldProps("name")}
                    error={formik.touched.name ? formik.errors.name : undefined}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Phone Number
                  </label>
                  <Input
                    className="text-white"
                    placeholder="phoneNumber"
                    type="text"
                    {...formik.getFieldProps("phoneNumber")}
                    error={
                      formik.touched.phoneNumber
                        ? formik.errors.phoneNumber
                        : undefined
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Email (No update allowed)
                  </label>
                  <Input
                    className="text-white"
                    placeholder="email"
                    type="text"
                    disabled
                    value={formik.values.email}
                  />
                </div>

                <div className="">
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">
                    Gender
                  </label>
                  <div className="flex gap-2 sm:gap-4">
                    {genders.map((option) => (
                      <label
                        key={option}
                        className="flex items-center border rounded-sm w-20 sm:w-28 h-8 sm:h-10 justify-center text-xs sm:text-sm"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={formik.values.gender === option}
                          onChange={() =>
                            formik.setFieldValue("gender", option)
                          }
                          className="mr-1 sm:mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly">
                <button
                  type="submit"
                  className="text-white bg-green-500 rounded-md mt-4 p-2"
                >
                  Update
                </button>
                <Link href="/resetPassword">
                  <button
                    type="button"
                    className="text-white bg-blue-500 rounded-md mt-4 p-2"
                  >
                    Reset
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-white bg-red-500 rounded-md mt-4 p-2"
                >
                  Logout
                </button>
              </div>
            </form>
          </div> */}


<div className="bg-gray-800 p-6 rounded-md w-full sm:w-2/3">
  <form onSubmit={formik.handleSubmit} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Full Name
        </label>
        <Input
          className="text-white"
          placeholder="name"
          type="text"
          {...formik.getFieldProps("name")}
          error={formik.touched.name ? formik.errors.name : undefined}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Phone Number
        </label>
        <Input
          className="text-white"
          placeholder="phoneNumber"
          type="text"
          {...formik.getFieldProps("phoneNumber")}
          error={
            formik.touched.phoneNumber
              ? formik.errors.phoneNumber
              : undefined
          }
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Email (No update allowed)
        </label>
        <Input
          className="text-white"
          placeholder="email"
          type="text"
          disabled
          value={formik.values.email}
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm text-gray-400 mb-1">
          Gender
        </label>
        <div className="flex gap-4 flex-wrap">
          {genders.map((option) => (
            <label
              key={option}
              className="flex items-center border rounded-sm w-auto h-8 sm:h-10 justify-center text-xs sm:text-sm"
            >
              <input
                type="radio"
                name="gender"
                value={option}
                checked={formik.values.gender === option}
                onChange={() => formik.setFieldValue("gender", option)}
                className="mr-1 sm:mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-0">
      <button
        type="submit"
        className="text-white bg-green-500 rounded-md mt-4 p-2 w-full sm:w-auto"
      >
        Update
      </button>
      <Link href="/resetPassword">
        <button
          type="button"
          className="text-white bg-blue-500 rounded-md mt-4 p-2 w-full sm:w-auto"
        >
          Reset
        </button>
      </Link>
      <button
        type="button"
        className="text-white bg-red-500 rounded-md mt-4 p-2 w-full sm:w-auto"
      >
        Logout
      </button>
    </div>
  </form>
</div>

        </div>
      </main>
    </div>
  );
}
