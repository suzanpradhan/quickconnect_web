"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/redux/clientStore";
import { profileApi } from "@/modules/profile/profileApi";
import { RootState } from "@/core/redux/store";
import {
  ProfileFormValues,
  ProfileDataType,
} from "@/modules/profile/profileType";
import Link from "next/link";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const [pageIndex] = useState(1);
  const [gender, setGender] = useState("Female");
  const genders = ["Male", "Female", "Others"];

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

  const onSubmit = async (values: ProfileFormValues) => {
    console.log("Updating profile with values:", values);
    try {
      const result = await dispatch(
        profileApi.endpoints.updateProfileByToken.initiate({
          name: values.name,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
        })
      );

      if ("data" in result) {
        // Successfully updated profile
        console.log("Updated profile successfully!", result.data);
      } else if ("error" in result) {
        console.error("Profile update failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred during profile update:", error);
    }
  };

  const profileData = useAppSelector(
    (state: RootState) =>
      state.profileApi.queries[`getProfileByToken(${pageIndex})`]
        ?.data as ProfileDataType
  );

  console.log(profileData);

  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: profileData?.user.name ?? "",
      phoneNumber: profileData?.user.phoneNumber ?? "9861209638",
      email: profileData?.user.email ?? "",
      gender: profileData?.user.gender ?? "Female",
    },
    onSubmit,
    validateOnChange: true,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold mb-6">My Profile</h2>
        <div className="flex gap-8">
          {/* Profile Picture and Info */}
          <div className="bg-gray-800 p-6 rounded-md w-1/4 h-48 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-600 rounded-full overflow-hidden mb-4">
              <img
                src={"/assets/login.png"}
                alt="Profile Picture"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            </div>
            <p className="text-xl font-bold">{profileData?.user.name}</p>
            <p className="text-gray-400">{profileData?.user.phoneNumber}</p>
            <div className="flex">
              <Link
                href="/resetPassword"
                className="text-left p-2 rounded bg-blue-500 hover:bg-blue-600 mt-4"
              >
                <span>Reset</span>
              </Link>
              <button className="ml-8">Logout</button>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-gray-800 p-6 rounded-md w-2/3">
            <form
            onSubmit={formik.handleSubmit}
            className="space-y-4">
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
                  phone Number
                  </label>
                  <Input
                    className="text-white"
                    placeholder="phoneNumber"
                    type="text"
                    {...formik.getFieldProps("phoneNumber")}
                    error={formik.touched.phoneNumber ? formik.errors.phoneNumber : undefined}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                  email
                  </label>
                  <Input
                    className="text-white"
                    placeholder="email"
                    type="text"
                    {...formik.getFieldProps("email")}
                    error={formik.touched.name ? formik.errors.name : undefined}
                  />
                </div>
            

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    {genders.map((option) => (
                      <label
                        key={option}
                        className="flex items-center border rounded-sm w-28 h-10 justify-center"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={gender === option}
                          onChange={() => setGender(option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gender Selection Section */}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
