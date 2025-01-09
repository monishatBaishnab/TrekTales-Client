"use client";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AuthContainer from "../_components/AuthContainer";

import TButton from "@/components/ui/TButton";
import TForm from "@/components/form/TForm";
import TInput from "@/components/form/TInput";
import useLoginUser from "@/hooks/auth.hooks";
import { useUserInfo } from "@/context/UserInfoProvider";

const Login = () => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("");
  const [credentials, setCredentials] = useState({});
  const { mutate, data, isLoading, isSuccess } = useLoginUser();
  const { setUserInfoLoading } = useUserInfo();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutate(data);
  };

  const handleCredentialsUpdate = (role: string) => {
    if (role === "admin") {
      const values = {
        email: "monishat@gmail.com",
        password: "11",
      };

      setCredentials(values);
      setActiveKey(role);
    } else if (role === "user") {
      const values = {
        email: "rakib@gmail.com",
        password: "11",
      };

      setCredentials(values);
      setActiveKey(role);
    }
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !data?.error) {
      setUserInfoLoading(true); // Update context state after render
      router.push("/"); // Navigate to the home page
    }
  }, [isSuccess, isLoading]);

  return (
    <AuthContainer>
      <div className="space-y-2 text-center">
        <h1 className="title-1">Welcome Back Man! 👋</h1>
        <p className="paragraph">Enter Login Details</p>
      </div>
      <div className="flex items-center gap-2">
        <TButton
          className={activeKey === "user" ? "bg-persian-green-600 text-white" : ""}
          color="persian-green-gost"
          size="sm"
          onPress={() => handleCredentialsUpdate("user")}
        >
          User Credentials
        </TButton>
        <TButton
        className={activeKey === "admin" ? "bg-persian-green-600 text-white" : ""}
          color="persian-green-gost"
          size="sm"
          onPress={() => handleCredentialsUpdate("admin")}
        >
          Admin Credentials
        </TButton>
      </div>
      <div className="mx-auto w-full space-y-5 sm:w-1/2 md:w-3/4 lg:w-1/2">
        <TForm defaultValues={credentials} onSubmit={handleSubmit}>
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
