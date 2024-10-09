"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { Facebook, Instagram, SendHorizonal, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "@/components/ui/SectionTitle";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import TTextarea from "@/components/form/TTextarea";
import TButton from "@/components/ui/TButton";

const Contact = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data?.name && data?.email && data?.subject && data?.message) {
      toast.success("Your message sent.");
    } else {
      toast.error("Pleas fill up all fields.");
    }
  };

  return (
    <section>
      <div className="container">
        <SectionTitle
          bgText="Contact"
          classNames={{ base: "!justify-center !flex" }}
          planeText="Us"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TForm onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <TInput name="name" placeholder="Name" />
                  <TInput name="email" placeholder="Email" />
                </div>
                <TInput name="subject" placeholder="Subject" />
                <TTextarea name="message" placeholder="Type your message" />
                <TButton size="lg" startContent={<SendHorizonal />} type="submit">
                  Send Message
                </TButton>
              </div>
            </TForm>
          </div>
          <div>
            <SectionTitle bgText="Trek" planeText="Tales" />
            <p className="paragraph">
              Share travel stories, tips, and connect with fellow explorers for unforgettable
              adventures.
            </p>
            <h4 className="title-4 mb-2 mt-5">follow on:</h4>
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
      </div>
    </section>
  );
};

export default Contact;
