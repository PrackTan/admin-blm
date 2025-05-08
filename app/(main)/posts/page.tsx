import BackButton from "@/components/Backbutton";
import PostPagination from "@/components/Posts/postPagination";
import PostTable from "@/components/Posts/postTable";
import postData from "@/data/postData";

const PostsPage = () => {
  return (
    <>
      <BackButton text="Back to Home" href="/" />
      <PostTable posts={postData} title="Posts" />
      <PostPagination />
    </>
  );
};

export default PostsPage;
