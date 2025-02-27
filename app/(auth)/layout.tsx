import { ReactNode } from "react";
import Imgage from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Imgage
              src="/icons/logo1.svg"
              alt="Movie Recommender"
              width={40}
              height={40}
              priority
            />
            <h1 className="text-2xl font-bold text-white">Movie Recommender</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <img
          src="/images/poster_url.webp"
          alt="Auth Image"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default layout;
