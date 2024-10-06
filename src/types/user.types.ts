export interface IUser {
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
}
