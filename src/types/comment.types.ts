import { TUser } from "./user.types";

export type TReply = {
  _id?: string;
  post: string;
  author: TUser | string;
  content: string;
  isDeleted?: boolean;
  createdAt?: string;
};

export type TComment = {
  _id?: string;
  post: string;
  author: TUser | string;
  content: string;
  isDeleted?: boolean;
  replies?: TReply[];
  createdAt?: string;
};
