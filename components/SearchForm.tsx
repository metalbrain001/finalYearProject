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
import { SEARCH_OPTIONS, SEARCH_TYPES } from "@/constants";
import { toast } from "sonner";

interface SearchFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }> | void;
  type: "title" | "genre" | "actor" | "director";
}

const SearchForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: SearchFormProps<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      const result = await onSubmit(data);
      if (result?.success) {
        toast(`Success searching by ${type}`, {
          description: "You have successfully searched.",
        });
      } else {
        throw new Error(result?.error || "There was an error searching.");
      }
    } catch (error) {
      toast(`Error searching by ${type}`, {
        description: "There was an error searching. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {String(
                      SEARCH_OPTIONS[field.name as keyof typeof SEARCH_OPTIONS]
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        SEARCH_TYPES[field.name as keyof typeof SEARCH_TYPES]
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
      <Button type="submit">Search</Button>
    </div>
  );
};

export default SearchForm;
