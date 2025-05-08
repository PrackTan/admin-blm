"use client";
// Chỉ định rằng đây là component phía client, không phải server component

import BackButton from "@/components/Backbutton";
// Import component BackButton để tạo nút quay lại trang trước đó

// Import thư viện zod để xác thực dữ liệu
import * as z from "zod";
// Zod là thư viện giúp xác thực dữ liệu và định nghĩa schema

// Import hook useForm từ react-hook-form để quản lý form
import { useForm } from "react-hook-form";
// useForm là hook giúp quản lý trạng thái và xác thực form trong React

// Import zodResolver để tích hợp zod với react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";
// zodResolver giúp kết nối schema zod với react-hook-form
import { toast } from "sonner";

// Import các component Form từ thư viện UI
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Các component này giúp xây dựng form với UI nhất quán

// Import component Input để tạo trường nhập liệu
import { Input } from "@/components/ui/input";
// Component Input dùng để tạo trường nhập liệu văn bản

// Import component Button để tạo nút bấm
import { Button } from "@/components/ui/button";
// Component Button dùng để tạo các nút tương tác

// Import component Textarea để tạo trường nhập văn bản dài
import { Textarea } from "@/components/ui/textarea";
// Component Textarea dùng để nhập văn bản dài như nội dung bài viết

// Import kiểu dữ liệu Post từ thư mục types
import postData from "@/data/postData";
// Import dữ liệu bài viết từ file postData

import { use } from "react";
// Import hook use từ React để xử lý Promise trong component

// Định nghĩa schema xác thực form bằng zod
const formSchema = z.object({
  // Trường title phải là chuỗi và có ít nhất 1 ký tự
  title: z.string().min(1, { message: "Title is required" }),
  // Trường content phải là chuỗi và có ít nhất 1 ký tự
  body: z.string().min(1, { message: "Content is required" }),
  // Trường author phải là chuỗi và có ít nhất 1 ký tự
  author: z.string().min(1, { message: "Author is required" }),
  // Trường createdAt phải là chuỗi và có ít nhất 1 ký tự
  createdAt: z.string().min(1, { message: "Date is required" }),
  // Trường updatedAt phải là chuỗi và có ít nhất 1 ký tự
  updatedAt: z.string().min(1, { message: "Image is required" }),
});

// interface EditPostPageProps {
//   params: {
//     id: string;
//   };
// }
// Đây là interface bị comment, định nghĩa kiểu dữ liệu cho props của component

// z.infer<typeof formSchema> là một utility type của Zod
// z.infer dùng để tự động suy ra kiểu TypeScript từ schema Zod
// Nó chuyển đổi schema validation thành TypeScript type
// Ví dụ: z.infer<typeof formSchema> sẽ tạo ra một type có các trường title, body, author, createdAt, updatedAt
// Điều này giúp đảm bảo tính nhất quán giữa validation và type checking
// Khi schema thay đổi, kiểu TypeScript cũng tự động cập nhật theo

// Component trang chỉnh sửa bài viết
const EditPostPage = ({ params }: { params: Promise<{ id: string }> }) => {
  // Component nhận params là một Promise chứa id của bài viết
  const { id } = use(params);
  // Sử dụng hook use để giải quyết Promise và lấy id

  const post = postData.find((post) => post.id === id);
  // Tìm bài viết trong dữ liệu postData dựa trên id

  const form = useForm<z.infer<typeof formSchema>>({
    // Khởi tạo form với kiểu dữ liệu từ schema zod
    // z.infer<typeof formSchema> ở đây giúp TypeScript biết chính xác cấu trúc dữ liệu form
    // Điều này cung cấp type safety và autocomplete khi làm việc với form
    resolver: zodResolver(formSchema),
    // Sử dụng zodResolver để xác thực form theo schema
    defaultValues: {
      // Thiết lập giá trị mặc định cho form từ dữ liệu bài viết
      title: post?.title,
      body: post?.body,
      author: post?.author,
      createdAt: post?.createdAt?.toISOString(),
      updatedAt: post?.updatedAt?.toISOString(),
    },
  });

  console.log(post);
  // In thông tin bài viết ra console để debug
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Ở đây z.infer<typeof formSchema> đảm bảo rằng data có đúng cấu trúc
    // như đã định nghĩa trong schema, giúp tránh lỗi runtime
    // console.log(data);
    toast("Post updated successfully");
  };
  return (
    <div>
      {/* Component nút quay lại trang chủ */}
      <BackButton text="Back to Home" href="/posts" />
      {/* Tiêu đề trang */}
      <h3 className="text-2xl mb-4">Edit Post</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black  dark:text-white focus-visible:ring-offset-0"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Body
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black  dark:text-white focus-visible:ring-offset-0"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Author
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black  dark:text-white focus-visible:ring-offset-0"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                  Created At
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black  dark:text-white focus-visible:ring-offset-0"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full dark:bg-slate-800 dart:text-white"
          >
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

// Export component để sử dụng ở nơi khác
export default EditPostPage;
