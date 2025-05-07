import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon, Newspaper } from "lucide-react";
interface DashboardCardProps {
  title: string;
  icon: React.ReactElement<LucideIcon>;
  value: number;
}
const DashboardCard = ({ title, icon, value }: DashboardCardProps) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800 p-4 pb-0">
      <CardContent>
        <h3 className="text-3xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex gap-5 justify-center items-center">
          {icon}
          <h3 className="text-5xl font-bold text-slate-500 dark:text-slate-200">
            {value}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
