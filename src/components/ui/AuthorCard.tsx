import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

import TButton from "./TButton";

const AuthorCard = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <div className="size-20 overflow-hidden rounded-full">
        <img
          alt="User"
          className="size-full object-cover"
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="space-y-2">
        <Link className="title-4 block" href={`/authors/id`}>
          Jenny Kia
        </Link>
        <p className="paragraph">Fashion designer, Blogger, activist</p>
        <div className="flex items-center gap-2.5">
          <TButton isIconOnly className="!size-8" color="persian-green-gost" size="sm">
            <Facebook className="size-4" />
          </TButton>
          <TButton isIconOnly className="!size-8" color="persian-green-gost" size="sm">
            <Twitter className="size-4" />
          </TButton>
          <TButton isIconOnly className="!size-8" color="persian-green-gost" size="sm">
            <Instagram className="size-4" />
          </TButton>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
