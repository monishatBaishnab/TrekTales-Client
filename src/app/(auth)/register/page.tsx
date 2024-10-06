"use client";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AuthContainer from "../_components/AuthContainer";

import TButton from "@/components/ui/TButton";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import TFile from "@/components/form/TFile";
import { useRegisterUser } from "@/hooks/auth.hooks";
import { useUserInfo } from "@/context/UserInfoProvider";

const Register = () => {
  const router = useRouter();
  const { mutate, isSuccess, isLoading } = useRegisterUser();
  const { setUserInfoLoading } = useUserInfo();
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = { ...data };

    // Remove profilePhoto from the userData
    delete userData.profilePhoto;

    // Create FormData instance
    const formData = new FormData();

    formData.append("data", JSON.stringify(userData));

    if (data.profilePhoto) {
      formData.append("image", data.profilePhoto);
    }
    // Pass FormData to the mutate function
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setUserInfoLoading(true); // Update context state after render
      router.push("/"); // Navigate to the home page
    }
  }, [isSuccess, isLoading]);

  return (
    <AuthContainer>
      <div className="space-y-2 text-center">
        <h1 className="title-1">Hi, Get Started Now 👋</h1>
        <p className="paragraph">Enter details to create your Trek Tales account</p>
      </div>
      <div className="mx-auto w-full space-y-5 sm:w-1/2 md:w-3/4 lg:w-1/2">
        <TForm defaultValues={{ profilePhoto: "image.png" }} onSubmit={handleSubmit}>
          <div className="space-y-5">
            <TInput name="name" placeholder="Full Name" size="lg" variant="underlined" />
            <TInput name="email" placeholder="Email Address" size="lg" variant="underlined" />
            <TInput
              name="password"
              placeholder="Password"
              size="lg"
              type="password"
              variant="underlined"
            />
            <TFile name="profilePhoto" />
            <TButton
              fullWidth
              className={isLoading ? "cursor-auto opacity-60" : ""}
              isDisabled={isLoading}
              radius="full"
              type="submit"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Register"}
            </TButton>
          </div>
        </TForm>
        <p className="paragraph flex items-center gap-1 text-center">
          <span>Already have an account?</span>
          <Link className="text-persian-green-600" href={"/login"}>
            Login Now
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default Register;
