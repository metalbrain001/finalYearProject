"use client";

import React from "react";
import OnboardingForm from "@/components/OnBoardingForm";
import OnboardForm from "@/components/OnboardingFM";
import { onboardingSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href="/sign-in" className="text-light-1">
          {" "}
          Go Back
        </Link>
      </Button>
      {/* <OnboardingForm /> */}
      <section className="mx-auto p-6 w-full">
        <OnboardForm type="create" />
      </section>
    </>
  );
};

export default page;
