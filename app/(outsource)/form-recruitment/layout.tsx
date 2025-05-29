import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster as Sonner, Toaster, ToasterProps } from "sonner";

export const metadata: Metadata = {
  title: "Form Ứng Tuyển - Bach Long Mobile",
  description: "Form ứng tuyển trực tuyến cho Bach Long Mobile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
