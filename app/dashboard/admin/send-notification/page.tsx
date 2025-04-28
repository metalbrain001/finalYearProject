// app/admin/send/page.tsx
"use client";
import React from "react";
import AdminPushSender from "@/components/admin/SendNotification";
import FcmForm from "@/components/admin/forms/FcmForm";
import { fcmSchema } from "@/lib/validations";
import { useSendNotification } from "@/hooks/use-sendnotification";

const page = () => {
  const { sendNotification, loading, success } = useSendNotification();
  return (
    <div>
      <FcmForm
        type="SEND"
        schema={fcmSchema}
        defaultValues={{
          title: "",
          message: "",
        }}
        onSubmit={sendNotification}
      />
    </div>
  );
};

export default page;
