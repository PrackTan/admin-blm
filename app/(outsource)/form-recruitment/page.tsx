// app/form-recruitment/page.tsx
import RecruitmentForm from "@/components/recruitmentForm/RecruitmentForm";
export default async function Page({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
  const slug = (await searchParams).slug || "";
  return <RecruitmentForm slug={slug} />;
}
