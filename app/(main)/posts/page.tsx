import BackButton from "@/components/Backbutton";
import PostPagination from "@/components/posts/postPagination";
import PostTable from "@/components/posts/postTable";
import postData from "@/data/postData";

const PostsPage = () => {
  return (
    <>
      <BackButton text="Back to Home" href="/" />
      {/* <PostTable posts={postData} title="Posts" /> */}
      <PostPagination />
    </>
  );
};

export default PostsPage;
