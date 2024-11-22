
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik } from "formik";
import { ZodError } from "zod";
import { useAppDispatch } from "@/core/redux/clientStore";
import authApi from "@/modules/register/registerApi";
import {
  RegisterFormInputs,
  registerSchema,
} from "@/modules/register/registerType";
import { apiPaths } from "@/core/api/apiConstants";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (values: RegisterFormInputs) => {
    try {
      registerSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
        return error.formErrors.fieldErrors;
      }
    }
  };

  console.log("here", process.env.NEXT_PUBLIC_SERVER_URL);

  const onSubmit = async (values: RegisterFormInputs) => {
    console.log("here", values);

    try {
      const result = await dispatch(
        authApi.endpoints.register.initiate(values)
      );

      if ("data" in result) {
        console.log("Registration successful!", result.data);
        router.push("/login");
      } else if ("error" in result) {
        console.error("Registration failed:", result.error);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", 
    },
    validateOnChange: true,
    onSubmit,
    validate: validateForm,
  });

  return (
    <div className="flex h-screen">
      <div className="w-1/3 h-full relative">
        <Image
          src="/assets/login.png"
          alt="Login background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-[#169AD6] opacity-50"></div>
      </div>

      <div className="w-2/3 bg-[#222222] flex items-center justify-center h-full">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-4xl font-bold text-center text-blue-500 font-helvetica">
            QuickConnect
          </h2>

          <form
            className="flex flex-col items-end gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <Input
              className="text-white mt-4"
              placeholder="Enter Your Name"
               type="name"
              error={formik.touched.name ? formik.errors.name : undefined}
              {...formik.getFieldProps("name")}
            />
            <Input
              className="text-white mt-4"
              placeholder="Enter Your Email"
              type="email"
              error={formik.touched.email ? formik.errors.email : undefined}
              {...formik.getFieldProps("email")}
            />

            <Input
              className="text-white mt-4"
              placeholder="Enter Your Password"
              type="password"
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
              {...formik.getFieldProps("password")}
            />
            <Input
              className="text-white mt-4"
              placeholder="Confirm Your Password" // Correct placeholder
              type="password" // Changed to type="password"
              error={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
              {...formik.getFieldProps("confirmPassword")} // Use correct field name
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm text-black bg-[#169AD6] font-helvetica font-normal"
            >
              {isLoading ? "Loading..." : "Register"} {/* Change button label to Register */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
