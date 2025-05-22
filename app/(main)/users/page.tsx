"use client";
import BackButton from "@/components/Backbutton";
import useFetch from "@/hooks/useFetch";
import ClientTable from "@/components/users/UsersTable";

const PostsPage = () => {
  const { data, error, loading } = useFetch({
    endpoint: "http://localhost:8080/api/v1/client",
    options: {
      method: "GET",
    },
  });
  const postData1 = data?.data.result;
  console.log("check data", postData1);
  return (
    <>
      <BackButton text="Back to Home" href="/" />
      <ClientTable data={postData1} title="Users" />
    </>
  );
};

export default PostsPage;
