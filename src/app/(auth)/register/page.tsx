import { Input } from "@nextui-org/input";
import Link from "next/link";

import AuthContainer from "../_components/AuthContainer";

import TButton from "@/components/ui/TButton";

const Register = () => {
  return (
    <AuthContainer>
      <div className="space-y-2 text-center">
        <h1 className="title-1">Hi, Get Started Now 👋</h1>
        <p className="paragraph">Enter details to create your Trek Tales account</p>
      </div>
      <div className="mx-auto w-full space-y-5 sm:w-1/2 md:w-3/4 lg:w-1/2">
        <Input fullWidth placeholder="Full Name" size="lg" variant="underlined" />
        <Input fullWidth placeholder="Email Address" size="lg" variant="underlined" />
        <Input fullWidth placeholder="Password" size="lg" variant="underlined" />
        <Input fullWidth placeholder="Confirm Password" size="lg" variant="underlined" />
        <TButton fullWidth radius="full">
          Register
        </TButton>
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
