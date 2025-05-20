"use client";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Folder, Folders, Newspaper, Users, MessageCircle } from "lucide-react";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import useFetch from "@/hooks/useFetch";
import ReviewsTable from "@/components/Reviews/reviewsTable";
export default function Home() {
  const { data, error, loading } = useFetch({
    endpoint: "http://localhost:8080/api/v1/reviews",
    options: {
      method: "GET",
    },
  });
  const postData1 = data?.data.result;
  console.log("check data", postData1);
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
      <ReviewsTable title="Latest Posts" data={postData1} />
    </>
  );
}
