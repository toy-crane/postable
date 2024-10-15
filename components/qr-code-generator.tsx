"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GradientPicker } from "@/components/gradient-picker";
import QRCodeCard from "@/components/qr-code-card";
import { track } from "@vercel/analytics";
const formSchema = z.object({
  networkName: z.string().min(1, "네트워크 이름이 필요합니다"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  securityType: z.enum(["WPA", "WEP", "None"]),
  backgroundColor: z.string().default("#FFFFFF"),
  label: z.string().default("WiFi QR 코드"),
  brandName: z.string().min(1, "브랜드 이름을 입력해 주세요."),
});

type FormValues = z.infer<typeof formSchema>;

export default function QRCodeGenerator() {
  const [qrCodeData, setQRCodeData] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      networkName: "",
      password: "",
      securityType: "WPA",
      backgroundColor: "#FFFFFF",
      label: "WIFI QR CODE",
      brandName: "",
    },
  });

  function onSubmit(values: FormValues) {
    setQRCodeData(values);
    track("Generate QR Code");
  }

  function handleDownload() {
    // Implement download logic here
    track("Download Image");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="networkName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="securityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select security type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                    <SelectItem value="WEP">WEP</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Color</FormLabel>
                <FormControl>
                  <GradientPicker
                    background={field.value}
                    setBackground={field.onChange}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Generate QR Code</Button>
        </form>
      </Form>
      <div>
        {qrCodeData && (
          <>
            <QRCodeCard data={qrCodeData} />
            <Button onClick={handleDownload} className="mt-4">
              Download Image
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
