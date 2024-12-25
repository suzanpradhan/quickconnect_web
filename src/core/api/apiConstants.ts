import forgotPassword from "@/app/(auth)/(forgotPassword)/forgotPassword/page";
import { getSession } from "next-auth/react";
export const apiConfig = {
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
export async function setHeaders(headers: Headers) {
  const session = await getSession();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (session) {
    const token = (session! as any).user.accessToken as string;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  }
  headers.set("accept", "application/json");
  return headers;
}
export const apiPaths = {
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL + "/api",
  loginUrl: "/signin",
  registerUrl: "/signup",
  myProfileUrl: "/userInfo",
  resetPasswordUrl: "/changePassword",
  forgotPasswordUrl: "/forgotPassword",
  createNewPasswordUrl: "/createNewPassword",
  updateProfileUrl: "/edictUserInfo",
  ChatDetailUrl: "/user",
  CreatRoomsUrl: "/create-room",
  JoinRoomUrl: "/join-room",
  MessageUrl: "/messages",
  SendmessageUrl: "/send-message",
  MemberListUrl: "/allUsers",
  DeleteMessageUrl: "/delete-messages",
  LogOutUrl: "/log-out",
  PrivateChatUrl: "/create-private-room",
  GroupUrl: "/join-room",
};
