import Navbar from "@/components/Navbar";
import { Sidebar } from "lucide-react";
import { Toaster } from "sonner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-[100vh] flex items-center justify-center relative">
        <Navbar />

        <div className="flex">
          <div className="hidden md:block h-[100vh] w-[300px]">
            <Sidebar />
          </div>
          <div className="w-full p-5 md:max-w-[1140px]">{children}</div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default AuthLayout;
