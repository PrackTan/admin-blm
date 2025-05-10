"use client";
// Import React hooks để quản lý state và side effects
// useState: Hook để quản lý state trong functional component
// useRouter: Hook từ Next.js để điều hướng trang
// z (zod): Thư viện để xác thực dữ liệu và định nghĩa schema
// useForm: Hook từ react-hook-form để quản lý form và validation
// zodResolver: Adapter kết nối zod với react-hook-form
// toast: Component từ thư viện sonner để hiển thị thông báo
// Form components: Các UI components từ shadcn/ui để xây dựng form
// Card components: Các UI components để tạo card layout
// Input, Button, Textarea: Các UI components cơ bản
// BackButton: Component tùy chỉnh để quay lại trang trước

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/components/Backbutton";
import LoginForm from "./LoginForm";
const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  name: z.string().min(1, { message: "Tên không được để trống" }),
});
// Đoạn code dưới đây định nghĩa schema xác thực form đăng nhập sử dụng thư viện zod
// - email: phải là một chuỗi có định dạng email hợp lệ, nếu không sẽ hiển thị thông báo lỗi
// - password: phải là chuỗi có ít nhất 6 ký tự, nếu không sẽ hiển thị thông báo lỗi
// Schema này được sử dụng với react-hook-form thông qua zodResolver để xác thực dữ liệu nhập vào form

const RegisterForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log("check register", data);
    // setTimeout(() => {
    //   toast.success("Đăng nhập thành công");
    //   router.push("/dashboard");
    //   setIsLoading(false);
    // }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng nhập</CardTitle>
        <CardDescription>Đăng nhập vào tài khoản của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Tên
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black focus-visible:ring-0 dark:text-white"
                      {...field}
                      placeholder="Nhập tên"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black focus-visible:ring-0 dark:text-white"
                      {...field}
                      placeholder="Nhập email"
                    />
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
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black focus-visible:ring-0 dark:text-white"
                      {...field}
                      placeholder="Nhập mật khẩu"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Nhập lại mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 text-black focus-visible:ring-0 dark:text-white"
                      {...field}
                      placeholder="Nhập lại mật khẩu"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Export component để sử dụng ở nơi khác
export default RegisterForm;
