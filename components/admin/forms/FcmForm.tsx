"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fcmSchema } from "@/lib/validations";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { FCM_FIELD_NAMES, FCM_FIELD_TYPES } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUsersWithToken } from "@/hooks/use-getuser-token";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: Omit<T, "token">;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SEND" | "UPDATE";
}

interface UserOption {
  id: string;
  name: string;
}

const FcmForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSend = type === "SEND";
  const { users } = useGetUsersWithToken();
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result && result.success) {
      toast(`✅ Notification sent`, {
        description: "The notification was successfully delivered.",
      });
      router.push("/"); // or stay on page if needed
    } else {
      toast(`❌ Notification failed`, {
        description: result.error || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-4xl"
      >
        {/* ✅ User Token Select */}
        <FormField
          control={form.control}
          name={"token" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select User</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <SelectTrigger className="shad-input">
                  <SelectValue placeholder="Choose a user" />
                </SelectTrigger>
                <SelectContent className="bg-dark-3 text-light-1 border border-dark-4 shadow-md">
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.token}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-white">
                  {FCM_FIELD_NAMES[field.name as keyof typeof FCM_FIELD_NAMES]}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={
                      FCM_FIELD_TYPES[
                        field.name as keyof typeof FCM_FIELD_TYPES
                      ]
                    }
                    autoComplete="on"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="shad-button_primary">
          {isSend ? "Send Notification" : "Update Notification"}
        </Button>
      </form>
    </Form>
  );
};

export default FcmForm;
