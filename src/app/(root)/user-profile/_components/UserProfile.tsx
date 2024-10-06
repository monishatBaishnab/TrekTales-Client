"use client";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { BadgeCheck, Pencil, Save, X } from "lucide-react";

import TButton from "@/components/ui/TButton";
import { authorImage } from "@/constants/global.constats";
import SectionTitle from "@/components/ui/SectionTitle";
import TInput from "@/components/form/TInput";
import TDatePicker from "@/components/form/TDatePicker";
import TTextarea from "@/components/form/TTextarea";
import TFile from "@/components/form/TFile";
const UserProfile = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col items-center gap-7 rounded-lg border border-shark-100 bg-shark-50 p-10 sm:flex-row">
      <div className="size-28 shrink-0 overflow-hidden rounded-full">
        <img alt="Author" className="size-full object-cover" src={authorImage} />
      </div>
      <div className="w-full space-y-3">
        <div className="flex flex-wrap items-center justify-between border-b border-b-shark-200 pb-3">
          <h2 className="title-2 flex items-center gap-1">
            <span>Alexandra H.</span> <BadgeCheck className="size-5 text-persian-green-600" />
          </h2>
          <div className="flex items-center gap-2">
            <TButton
              className="!gap-1 !text-sm !text-shark-600"
              color="gray"
              size="sm"
              startContent={<Pencil className="size-4" />}
              onPress={onOpen}
            >
              Update Profile
            </TButton>
          </div>
        </div>
        <p className="paragraph">
          Hi there! I&apos;m Jessica, the voice behind this blog. Traveling has always been my
          passion, and sharing my experiences through writing is something I truly enjoy. I believe
          in the power of storytelling to connect people and inspire them to explore the world.
        </p>
      </div>
      <Modal hideCloseButton={true} isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex justify-between gap-1 border-b border-b-shark-200">
            <SectionTitle bgText="Update" classNames={{ base: "!mb-0" }} planeText="Profile" />
            <TButton isIconOnly color="gray" size="sm" onPress={onClose}>
              <X className="size-5" />
            </TButton>
          </ModalHeader>
          <ModalBody>
            {/* <div className="space-y-5 py-5">
              <div className="flex items-center gap-5">
                <TInput label="Full Name" name="name" placeholder="Name" />
                <TInput isDisabled label="Email Address" name="email" placeholder="Email" />
              </div>
              <div className="flex items-center gap-5">
                <TInput isDisabled label="Password" name="password" placeholder="Password" />
                <TDatePicker label="Date Of Birth" name="dateOfBirth" />
              </div>
              <TTextarea
                label="Profile Bio"
                name="bio"
                placeholder="Write a brief bio about you."
              />
              <TFile label="Profile Picture" name="file" />
              <div className="flex items-center justify-end gap-2">
                <TButton
                  color="gray"
                  endContent={<X className="size-5" />}
                  size="lg"
                  onPress={onClose}
                >
                  Cancel
                </TButton>
                <TButton endContent={<Save className="size-5" />} size="lg">
                  Save
                </TButton>
              </div>
            </div> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserProfile;
