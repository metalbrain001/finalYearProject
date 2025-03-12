"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
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

interface AccountFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error: string }> | void;
}

const AccountForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
}: AccountFormProps<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result && result.success) {
      toast("Profile Updated", {
        description: "Your account details have been successfully updated.",
      });
    } else {
      toast("Error updating account", {
        description:
          "There was an error updating your details. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">My Account</h1>
      <p className="text-light-100">
        Update your account details. Some fields cannot be changed.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={
                        field.name === "email" || field.name === "fullName"
                      } // ✅ Disable certain fields
                      className={`form-input ${
                        field.name === "email" ||
                        field.name === "fullName" ||
                        field.name === "role"
                          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="shad-button_primary">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
