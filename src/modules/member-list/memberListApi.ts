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
