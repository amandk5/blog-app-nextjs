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
import Pagination from "@/components/Pagination";
import { UPDATE_CURRENT_PAGE } from "@/redux/blog/blog.types";

export default function Home({ posts, totalPages, page }) {
  const { token } = useSelector((store) => store.auth);
  const { currentPage } = useSelector((store) => store.blog);

  if (currentPage === null) {
    dispatch({ type: UPDATE_CURRENT_PAGE, payload: page });
  }

  // for dispatching action
  const dispatch = useDispatch();
  // for routing
  const router = useRouter();

  // for handling pagination
  const onPageChange = (page) => {
    // setCurrentPage(page);
    dispatch({ type: UPDATE_CURRENT_PAGE, payload: page });
    router.push(`/?page=${page}`);
    // console.log("index page", page);
  };

  useEffect(() => {
    if (router.pathname === "/" && currentPage !== 1) {
      if (currentPage !== 1) {
        dispatch({ type: UPDATE_CURRENT_PAGE, payload: currentPage });
        router.push(`/?page=${currentPage}`);
      }
    }
  }, [router.query.page]);

  useEffect(() => {
    if (localStorage.getItem("blog_app_user_token") !== undefined) {
      let token = localStorage.getItem("blog_app_user_token");
      dispatch({ type: SET_INITIAL_STATE, payload: token });
    } else {
      dispatch({ type: SET_INITIAL_STATE, payload: null });
    }
  }, [token]);

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
        {posts.length !== 0 && (
          <>
            <DisplayBlogs posts={posts} />
            {/* pagination  */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

export async function getServerSideProps({ query }) {
  try {
    // current page
    const page = query.page || 1;
    const limit = 10;

    // Make a GET request to your API endpoint for retrieving blog posts
    const response = await fetch(
      `https://blog-app-adk.vercel.app/api/blog?current_page=${page}&limit=${limit}`
    ).then((res) => res.json());
    // console.log(d);
    // const response = await axios.get("http://localhost:3000/api/blog");
    // Extract the blog posts from the API response data
    const posts = response.post;
    const totalPages = response.totalPages;
    // console.log(posts);
    // Pass the blog posts as props to the page component
    return { props: { posts, totalPages, page } };
  } catch (err) {
    console.error(err);

    // Handle any errors that occur while fetching the data
    // return { props: { posts: [] }, notFound: true };
    return { props: { posts: [] } };
  }
}
