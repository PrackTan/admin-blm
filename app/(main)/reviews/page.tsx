"use client";
import BackButton from "@/components/Backbutton";
import PostPagination from "@/components/posts/postPagination";
import PostTable from "@/components/posts/postTable";
import useFetch from "@/hooks/useFetch";
import postData from "@/data/postData";
import ReviewsTable from "@/components/Reviews/reviewsTable";

const PostsPage = () => {
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
      <BackButton text="Back to Home" href="/" />
      <ReviewsTable data={postData1} title="Reviews" />
    </>
  );
};

export default PostsPage;
