export type TUser = {
  _id?: string;
  email: string;
  password?: string;
  name?: string;
  bio?: string;
  profilePicture?: string;
  role: string;
  isVerified?: boolean;
  isBlocked?: boolean;
  dateOfBirth?: string;
  followers?: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TUserInfo = {
  _id: string;
  role: string;
  email: string;
  isVerified: boolean;
};
