import { SET_INITIAL_STATE } from "@/redux/auth/auth.types";
import { Box } from "@chakra-ui/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import LogoAndAppName from "@/components/LogoAndAppName";
import { useState } from "react";
import LoginAndRegisterLink from "@/components/LoginAndRegisterLink";
import axios from "axios";
import DisplayBlogs from "@/components/DisplayBlogs";

export default function Home({ posts }) {
  const { token } = useSelector((store) => store.auth);

  const [blogPosts, setBlogPosts] = useState(posts);

  // for dispatching action
  const dispatch = useDispatch();
  // for routing
  const router = useRouter();
  // console.log(posts);

  useEffect(() => {
    if (localStorage.getItem("blog_app_user_token") !== undefined) {
      let token = localStorage.getItem("blog_app_user_token");
      dispatch({ type: SET_INITIAL_STATE, payload: token });
    } else {
      dispatch({ type: SET_INITIAL_STATE, payload: null });
    }
  }, [token]);

  // if (token !== "null" || token !== undefined || token !== null) {
  //   router.replace("/dashboard");
  // }

  useEffect(() => {
    if (token !== null) {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [token]);

  return (
    <Box margin="auto" width="95%">
      <LogoAndAppName />
      <LoginAndRegisterLink />
      <br />
      <Box margin={"auto"} w="95%">
        {/* display blogs here  */}
        {blogPosts.length !== 0 && <DisplayBlogs posts={blogPosts} />}
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    // Make a GET request to your API endpoint for retrieving blog posts

    const response = await fetch(
      "https://blog-app-adk.vercel.app/api/blog"
    ).then((res) => res.json());
    // console.log(d);
    // const response = await axios.get("http://localhost:3000/api/blog");
    // Extract the blog posts from the API response data
    const posts = response.post;
    // console.log(posts);
    // Pass the blog posts as props to the page component
    return { props: { posts } };
  } catch (err) {
    console.error(err);

    // Handle any errors that occur while fetching the data
    // return { props: { posts: [] }, notFound: true };
    return { props: { posts: [] } };
  }
}
