import Image from "next/image";
import { Button } from "@/components/ui/button";
import DashboardCard from "./../components/dashboard/DashboardCard";
import { Folder, Folders, Newspaper, Users, MessageCircle } from "lucide-react";
import PostTable from "@/components/Posts/postTable";
import postData from "@/data/postData";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 justify-between mb-5">
        <DashboardCard
          title="Post"
          icon={<Newspaper className="text-slate-500" size={72} />}
          value={100}
        />
        <DashboardCard
          title="Categories"
          icon={<Folders className="text-slate-500" size={72} />}
          value={12}
        />
        <DashboardCard
          title="Users"
          icon={<Users className="text-slate-500" size={72} />}
          value={120}
        />
        <DashboardCard
          title="Comment"
          icon={<MessageCircle className="text-slate-500" size={72} />}
          value={1200}
        />
      </div>
      <AnalyticsChart />
      <PostTable title="Latest Posts" posts={postData} />
    </>
  );
}
