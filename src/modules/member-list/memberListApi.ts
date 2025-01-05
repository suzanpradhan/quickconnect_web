import { nonempty } from "@/core/utils/formUtils";
import { z } from "zod";
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  resetToken: string | null;
  resetTokenExpiry: string | null;
  nameUpdateAt: string | null;
  phoneNumber: string | null;
  gender: string | null;
  avatar: string | null;
}

export interface GetAllUsersResponse {
  message: boolean;
  users: User[];
}

export interface Private {
  success: boolean;
  message: string;
  chatId: string;
  receiverName: string;
}

export interface Group {
  joinLink: string;
  joinUserId: string;
  joinUserName: string;
  message: string;
}
