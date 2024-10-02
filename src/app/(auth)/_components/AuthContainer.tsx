import Link from "next/link";
import { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:flex min-h-screen relative bg-[url(https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-bottom bg-no-repeat">
            <Link href="/">
              <div className="absolute left-10 top-10 mb-10 inline-flex items-center gap-1">
                <h3 className="title-3 bg-title">Trek</h3>
                <h3 className="title-3">Tales</h3>
              </div>
            </Link>
          </div>
          <div>
            <div className="flex min-h-screen flex-col items-center justify-center space-y-7 p-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthContainer;
