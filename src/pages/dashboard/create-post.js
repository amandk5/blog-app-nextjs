import { Box, Button, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MyEditor from "@/components/MyEditor";
import DOMPurify from "dompurify";
import DashboardHeader from "@/components/DashboardHeader";
import { postBlog } from "@/redux/blog/blog.action";
import { BLOG_POSTED_SUCCESSFULLY } from "@/redux/blog/blog.types";

export default function CreatePost() {
  const { token } = useSelector((store) => store.auth);
  const { blog_post } = useSelector((store) => store.blog);

  // for dispatching action
  const dispatch = useDispatch();
  // for routing
  const router = useRouter();

  useEffect(() => {
    // console.log("blog_post", blog_post);
    // if(blog_post===""){
    //   router.replace("/dashboard")
    // }
  }, [blog_post]);

  if (token === null) {
    router.replace("/login");
  }

  return (
    <Box margin="auto" w="95%">
      <DashboardHeader page="Create-Post" />
      <Box margin={"auto"} width={"95%"}>
        <Heading mb="2" fontSize="x-large">
          Create Blog Post
        </Heading>
      </Box>

      {/*  */}
      <MyEditor />

      {/* <DraftEditor /> */}

      {blog_post !== "" ? (
        <>
          <Box margin={"auto"} width={"95%"}>
            {/* create post button  */}
            <Box textAlign="right" mt="2">
              <Button
                bg="teal"
                color="white"
                onClick={async () => {
                  // dispatch postBlog function and send blog_post to postBlog function
                  let response = await postBlog(blog_post);

                  // if response is success then redirect to my blogs page else do nothing
                  if (response === "success") {
                    dispatch({ type: BLOG_POSTED_SUCCESSFULLY });
                    router.replace("/dashboard/my-blogs");
                  }
                }}
              >
                POST
              </Button>
            </Box>
            <Heading my="3" fontSize={"large"}>
              Preview
            </Heading>
          </Box>
          <Box
            margin="auto"
            width={"95%"}
            className="preview"
            dangerouslySetInnerHTML={createMarkup(blog_post)}
          ></Box>
        </>
      ) : null}
    </Box>
  );
}

function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}
