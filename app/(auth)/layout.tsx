import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("access_token")?.value;

  // Nếu đã đăng nhập (có token), thì chuyển hướng sang /main
  if (token) {
    redirect("/main"); // ✨ Sẽ hoạt động cả trên Vercel
  }
  return (
    <div className="h-[100vh] flex items-center justify-center relative">
      {children}
    </div>
  );
};

export default AuthLayout;
