"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAppDispatch } from "@/core/redux/clientStore";
import router, { useRouter } from "next/router";
import { z, ZodError } from "zod";
import { useFormik } from "formik";
import {
  resetPasswordSchema,
  resetPasswordValues,
} from "@/modules/resetPassword/resetType";
import resetPasswordApi from "@/modules/resetPassword/resetApi";
import { Input } from "@/components/ui/input";

const RequestResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const validateForm = (values: resetPasswordValues) => {
    try {
      resetPasswordSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (values: resetPasswordValues) => { 
  
    try {
      const result = await dispatch(
        resetPasswordApi.endpoints.resetPassword.initiate(values)
      );
  
      if ("data" in result) {
        // Successfully reset password
        console.log("Reset Password successful!", result.data);
  
        localStorage.removeItem("authToken");  
      sessionStorage.removeItem("authToken");
  
        // Redirect to login page
        router.push("/login");
      } else if ("error" in result) {
        console.error("Reset Password failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred during Reset Password:", error);
    }
  };
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#15161A]">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#15161A] border border-gray-700 rounded-lg shadow-2xl sm:p-10">
        <h2 className="text-2xl font-bold text-center text-white">
          Reset Password
        </h2>

        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Input
          className="text-white"
            placeholder="Old Password"
            type="password"
            error={formik.touched.oldPassword ? formik.errors.oldPassword : undefined}
            {...formik.getFieldProps("oldPassword")}
          />
        <Input
          className="text-white"
            placeholder="New Password"
            type="password"
            error={formik.touched.newPassword ? formik.errors.newPassword : undefined}
            {...formik.getFieldProps("newPassword")}
          />
             <Input
               className="text-white"
            placeholder="Confirm Password"
            type="password"
            error={formik.touched.confirmNewPassword ? formik.errors.confirmNewPassword : undefined}
            {...formik.getFieldProps("confirmNewPassword")}
          />
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-[#F65930] rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {loading ? "Sending..." : "Reset"}
          </button>
        </form>

        <Link href="/forgotPassword">
          <p className="mt-4 text-sm text-center text-white">
            Forgot your password?{" "}
            <span className="text-blue-500 hover:underline">forgotPassword</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RequestResetPassword;
