import RecruitmentForm from "@/components/recruitmentForm/RecruitmentForm";

export default function Page({ searchParams }: any) {
  const slug = typeof searchParams?.slug === "string" ? searchParams.slug : "";
  return <RecruitmentForm slug={slug} />;
}
