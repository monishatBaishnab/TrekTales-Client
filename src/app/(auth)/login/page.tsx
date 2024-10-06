"use client";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import AuthContainer from "../_components/AuthContainer";

import TButton from "@/components/ui/TButton";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import useLoginUser from "@/hooks/auth.hooks";

const Login = () => {
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = useLoginUser();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    mutate(data);
  };

  if (isSuccess && !isLoading) {
    if (!isLoading && isSuccess) {
      router.push("/");
    }
  }

  return (
    <AuthContainer>
      <div className="space-y-2 text-center">
        <h1 className="title-1">Welcome Back Man! 👋</h1>
        <p className="paragraph">Enter Login Details</p>
      </div>
      <div className="mx-auto w-full space-y-5 sm:w-1/2 md:w-3/4 lg:w-1/2">
        <TForm
          defaultValues={{
            email: "john.doe@example.com",
            password: "123",
          }}
          onSubmit={handleSubmit}
        >
          <div className="space-y-5 ">
            <TInput name="email" placeholder="Email Address" size="lg" variant="underlined" />
            <TInput
              name="password"
              placeholder="Password"
              size="lg"
              type="password"
              variant="underlined"
            />
            <TButton
              fullWidth
              className={isLoading ? "cursor-auto opacity-60" : ""}
              isDisabled={isLoading}
              radius="full"
              type="submit"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Login"}
            </TButton>
          </div>
        </TForm>
        <p className="paragraph flex items-center gap-1 text-center">
          <span>Don&apos;t have an account yet?</span>
          <Link className="text-persian-green-600" href={"/register"}>
            Create account
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default Login;
