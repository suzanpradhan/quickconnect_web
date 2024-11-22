"use client";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z, ZodError } from "zod";
import { useState } from "react";
import { nonempty } from "@/core/utils/formUtils";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().pipe(nonempty),
  password: z.string().pipe(nonempty),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = (values: LoginFormInputs) => {
    try {
      loginSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = async (values: LoginFormInputs) => {
    setIsLoading(true);

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/profile", // Use the extracted callback URL
    })
      .then(async (response: any) => {
        if (response?.error) {
          toast.error("Login Failed! Please check your credentials.");
        } else {
          // await session.update();
          router.replace("/"); // Redirect to the callback URL
        }
      })
      .catch((errorResponse) => {});
    setIsLoading(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
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
        <div className="absolute inset-0 bg-[#169AD6] opacity-50 "></div>
      </div>

      <div className="flex items-end justify-between"></div>

      <div className="w-2/3 bg-[#222222] flex items-center justify-center h-full">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-4xl font-bold text-blue-500 font-helvetica">
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
              placeholder="Email Address"
              error={formik.touched.email ? formik.errors.email : undefined}
              {...formik.getFieldProps("email")}
            />
            <Input
              placeholder="Password"
              type="password"
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
              {...formik.getFieldProps("password")}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm text-black bg-[#169AD6] font-helvetica font-normal"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}