export type TUser = {
  email: string;
  password?: string;
  name: string;
  bio?: string;
  profilePicture?: string;
  role?: string;
  dateOfBirth: string;
  interests?: string[];
  isDeleted?: boolean;
  isBlocked?: boolean;
};

export type TUserInfo = {
  _id: string;
  role: string;
  email: string;
};
