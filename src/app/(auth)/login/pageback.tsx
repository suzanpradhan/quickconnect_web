"use client";
import Image from "next/image";
import { nonempty } from "@/core/utils/formUtils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { z, ZodError } from "zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().pipe(nonempty),
  password: z.string().pipe(nonempty),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {

  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const onSubmit = async (values: LoginFormInputs) => {
    setIsLoading(true);
console.log("button clicked");
    await signIn('Credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/music', // Use the extracted callback URL
    })
      .then(async (response: any) => {
        if (response?.error) {
          toast.error("Login Failed! Please check your credentials.");
        } else {
          // await session.update();
          router.replace('/'); // Redirect to the callback URL
        }
      })
      .catch((errorResponse) => {});
    setIsLoading(false);
  };

  const handleLogin = async (values: LoginFormInputs) => {
    const validation = loginSchema.safeParse(values);
    if (!validation.success) {
      console.error("Validation failed:", validation.error.format());
      return;
    }
    setIsLoading(true);
    console.log("submited login")
    onSubmit
  };

  const validateForm = (values: LoginFormInputs) => {
    try {
      loginSchema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
      return {};
    }
  };

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
          <h2 className="text-4xl font-bold text-blue-500 font-helvetica">
            QuickConnect
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validateForm}
            onSubmit={handleLogin}
          >
            {({ values }) => (
              <form className="space-y-6">
                <div className="mt-20">
                  <div>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 border border-[#4E4E4E] placeholder-white bg-[#222222] text-white font-helvetica font-normal"
                      placeholder="Email"
                      value={values.email}
                  
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mt-4">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="w-full px-3 py-2 border border-[#4E4E4E] placeholder-white bg-[#222222] text-white font-normal font-helvetica"
                      placeholder="Password"
                      value={values.password}
            
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm text-black bg-[#169AD6] font-helvetica font-normal"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
