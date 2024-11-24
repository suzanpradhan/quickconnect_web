
"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { ZodError } from "zod";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/core/redux/clientStore";
import { newPasswordApi } from "@/modules/createNewPassword/newPasswordApi";
import {
  newPasswordFormValues,
  newPasswordSchema,
} from "@/modules/createNewPassword/newPasswordType";
import { Input } from "@/components/ui/input";

const Page = () => {
  const router = useRouter();
  const searchParams = useParams();
  const resetToken = searchParams.token?.[0]
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (values: newPasswordFormValues) => {
    try {
      newPasswordSchema.parse(values);
    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const validateToken = async (token: string | null) => {
    if (!token) {
      toast.error("No reset token found. Please request a new password reset.");
      router.push("/forgotPassword");
      return;
    }

    try {
      const result = await dispatch(
        newPasswordApi.endpoints.newPassword.initiate({
          resetToken: token,
          newPassword: "",
          confirmNewPassword: "",
        })
      );

      if ("error" in result) {
        toast.error("Invalid or expired reset token.");
        router.push("/forgotPassword");
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      toast.error("An error occurred while validating the token.");
    }
  };

  useEffect(() => {
    validateToken(resetToken ?? null); 
  }, [resetToken]);

  const onSubmit = async (values: newPasswordFormValues) => {
    if (!resetToken) {
      toast.error(
        "No reset token found. Please request a new password reset."
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await dispatch(
        newPasswordApi.endpoints.newPassword.initiate({
          resetToken: resetToken as string,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        })
      );

      if ("data" in result) {
        toast.success("Password updated successfully! Please login.");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      resetToken: resetToken ?? "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validateOnChange: true,
    onSubmit, 
    validate: validateForm,
  });


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">
          Reset Your Password
        </h2>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault(); 
            formik.submitForm(); 
          }}
        >
          <div>
            <Input
            className="text-white"
              placeholder="New Password"
              type="password"
              error={
                formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : undefined
              }
              {...formik.getFieldProps("newPassword")}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.newPassword}
              </p>
            )}

            <Input
             className="text-white mt-4"
              placeholder="Confirm New Password"
              type="password"
              error={
                formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword
                  ? formik.errors.confirmNewPassword
                  : undefined
              }
              {...formik.getFieldProps("confirmNewPassword")}
            />
            {formik.errors.confirmNewPassword &&
              formik.touched.confirmNewPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.confirmNewPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Remembered your password?{" "}
          <span className="text-blue-500 hover:underline">
            <a href="/login">Login</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Page;


