import { TUser } from "./user.types";

export type TClassNames = {
    base?: string;
    image?: {
      wrapper?: string;
      img?: string;
    };
    contentWrapper?: string;
    title?: string;
    description?: string;
    tag?: string;
    additional?: {
      author?: string;
      date?: string;
      comment?: string;
    };
    action?: string;
  };

export type TPostListCardProps = {
    classNames?: TClassNames;
    isDescription?: boolean;
    isAction?: boolean;
    isAuthor?: boolean;
    isDate?: boolean;
    isComment?: boolean;
    isImage?: boolean;
    post?: TPost;
  };

export type TPost = {
    _id: string
    author: TUser
    title: string
    image: string
    content: string
    category: string
    tags: string[]
    isPremium: boolean
    isFeatured: boolean
    isDeleted: boolean
    votes: any[]
    createdAt: string
    updatedAt: string
  }