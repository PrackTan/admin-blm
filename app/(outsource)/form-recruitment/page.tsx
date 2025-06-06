import RecruitmentForm from "@/components/recruitmentForm/RecruitmentForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Đang tải form...</div>}>
      <RecruitmentForm />
    </Suspense>
  );
}
