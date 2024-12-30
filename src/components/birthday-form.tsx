'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LunarDate } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  year: z.string().refine((val) => {
    const year = parseInt(val);
    return year >= 1940 && year <= 2053;
  }, "Year must be between 1940 and 2053"),
  month: z.string().refine((val) => {
    const month = parseInt(val);
    return month >= 1 && month <= 12;
  }, "Month must be between 1 and 12"),
  day: z.string().refine((val) => {
    const day = parseInt(val);
    return day >= 1 && day <= 30;
  }, "Day must be between 1 and 30"),
  isLeapMonth: z.boolean().default(false),
});

type BirthdayFormValues = z.infer<typeof formSchema>;

interface BirthdayFormProps {
  onSubmit: (birthday: { name: string; lunarBirthday: LunarDate }) => void;
}

export function BirthdayForm({ onSubmit }: BirthdayFormProps) {
  const form = useForm<BirthdayFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      year: new Date().getFullYear().toString(),
      month: "1",
      day: "1",
      isLeapMonth: false,
    },
  });

  function handleSubmit(values: BirthdayFormValues) {
    onSubmit({
      name: values.name,
      lunarBirthday: {
        year: parseInt(values.year),
        month: parseInt(values.month),
        day: parseInt(values.day),
        isLeapMonth: values.isLeapMonth,
      },
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Lunar Birthday</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Mom, Dad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" min={1940} max={2053} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 30 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isLeapMonth"
                render={({ field }) => (
                  <FormItem className="flex items-end space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-sm">Leap Month</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Add Birthday
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 