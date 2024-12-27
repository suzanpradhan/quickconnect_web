"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { ForgotFormValues, forgotSchema } from "@/modules/forgotPassword/forgotType";
import { ZodError } from "zod";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { forgotApi } from "@/modules/forgotPassword/forgotAPi";
import { useAppDispatch } from "@/core/redux/clientStore";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const validateForm = (values: ForgotFormValues) => {
    try {
      forgotSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (values: ForgotFormValues) => {
    setIsLoading(true);

    try {
      const result = await dispatch(
        forgotApi.endpoints.forgotPassword.initiate(values.email)
      ).unwrap();

      if (result.message) {
        setMessage(result.message);
        toast.success(result.message);
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "An unexpected error occurred.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#15161A]">
      <div className="w-full max-w-md p-8 space-y-4 bg-[#15161A] border border-gray-700 rounded-lg shadow-2xl sm:p-10">
        <h2 className="text-2xl font-bold text-center text-white">Reset Password</h2>
        <p className="text-sm text-center text-white">
          Enter your email to receive a password reset link
        </p>

        <form className="mt-4 space-y-4" onSubmit={formik.handleSubmit}>
          <Input
            className="text-white"
            placeholder="Email Address"
            error={formik.touched.email ? formik.errors.email : undefined}
            {...formik.getFieldProps("email")}
          />
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-[#F65930] rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link href="/login">
          <p className="mt-4 text-sm text-center text-white">
            Remembered your password?{" "}
            <span className="text-blue-500 hover:underline">Login</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
