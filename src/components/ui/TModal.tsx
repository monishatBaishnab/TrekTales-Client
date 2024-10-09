import { Modal, ModalContent, ModalHeader } from "@nextui-org/modal";
import React, { ReactNode } from "react";
import { X } from "lucide-react";

import SectionTitle from "./SectionTitle";
import TButton from "./TButton";

// Define the props interface for the ReusableModal
interface TModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  title: { bgText: string; planeText: string };
  size?: "2xl" | "sm" | "md" | "lg" | "xl" | "xs" | "3xl" | "4xl" | "5xl" | "full" | undefined; 
  hideCloseButton?: boolean;
  children: ReactNode; 
}

const TModal: React.FC<TModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  title,
  size = "2xl",
  hideCloseButton = false,
  children,
}) => {
  return (
    <Modal
      hideCloseButton={true}
      isOpen={isOpen}
      scrollBehavior="outside"
      size={size}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between gap-1 border-b border-b-shark-200">
          {title && (
            <SectionTitle
              bgText={title?.bgText}
              classNames={{ base: "!mb-0" }}
              planeText={title?.planeText}
            />
          )}
          {!hideCloseButton && (
            <TButton isIconOnly color="gray" size="sm" onPress={onClose}>
              <X className="size-5" />
            </TButton>
          )}
        </ModalHeader>
        <div className="px-6">{children}</div>
      </ModalContent>
    </Modal>
  );
};

export default TModal;
