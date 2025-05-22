import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  // const token = (await cookies()).get("access_token")?.value;

  // if (!token) {
  //   redirect("/auth");
  // }
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block h-[100vh] w-[300px]">
          <Sidebar />
        </div>
        <div className="p-5 w-full md:max-w-[1140px]">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
