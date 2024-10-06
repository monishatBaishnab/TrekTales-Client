import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Input } from "@nextui-org/input";

import TLogo from "@/components/ui/TLogo";
import { categories, quickLinks } from "@/constants/footer.constants";
import TButton from "@/components/ui/TButton";

const Footer = () => {
  return (
    <footer className="bg-persian-green-600/10">
      <div className="container !pb-0">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-6">
            <Link className="inline-block" href="/">
              <TLogo />
            </Link>
            <p className="paragraph">
              Share travel stories, tips, and connect with fellow explorers for unforgettable
              adventures.
            </p>
          </div>
          <div>
            <h4 className="title-4 mb-6">Blogs</h4>
            <div className="space-y-3">
              {categories?.map((category) => (
                <Link
                  key={category?.label}
                  className="block text-shark-800 transition-all hover:text-persian-green-600"
                  href={category?.path}
                >
                  {category?.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="title-4 mb-6">quick links</h4>

            <div className="space-y-3">
              {quickLinks?.map((category) => (
                <Link
                  key={category?.label}
                  className="block text-shark-800 transition-all hover:text-persian-green-600"
                  href={category?.path}
                >
                  {category?.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="title-4">Subscribe for newsletter</h4>
            <div className="flex items-center gap-2">
              <Input placeholder="Your Email" type="text" />
              <TButton>Subscribe</TButton>
            </div>
            <h4 className="title-4">follow on:</h4>
            <div className="flex items-center gap-2">
              <TButton isIconOnly size="sm">
                <Facebook className="size-4" />
              </TButton>
              <TButton isIconOnly size="sm">
                <Instagram className="size-4" />
              </TButton>
              <TButton isIconOnly size="sm">
                <Youtube className="size-4" />
              </TButton>
              <TButton isIconOnly size="sm">
                <Twitter className="size-4" />
              </TButton>
            </div>
          </div>
        </div>
        <div className="mt-3 block border-t border-t-persian-green-600/20 py-3 text-center">
          <p className="paragraph ">Al right reserved by Trek Tales 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
