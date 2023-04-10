import DashboardHeader from "@/components/DashboardHeader";
import DisplayBlogs from "@/components/DisplayBlogs";
import Pagination from "@/components/Pagination";
import { UPDATE_CURRENT_PAGE } from "@/redux/blog/blog.types";
import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard({ posts, page, totalPages }) {
  const { currentPage } = useSelector((store) => store.blog);
  // const [blogPosts, setBlogPosts] = useState(posts);

  const router = useRouter();
  const dispatch = useDispatch();
  if (currentPage === null) {
    dispatch({ type: UPDATE_CURRENT_PAGE, payload: page });
  }

  // for handling pagination
  const onPageChange = (page) => {
    // setCurrentPage(page);
    dispatch({ type: UPDATE_CURRENT_PAGE, payload: page });
    router.push(`/dashboard/?page=${page}`);
    // console.log("index page", page);
  };

  useEffect(() => {
    if (router.pathname === "/dashboard" && currentPage !== 1) {
      if (currentPage !== 1) {
        dispatch({ type: UPDATE_CURRENT_PAGE, payload: currentPage });
        router.push(`/dashboard/?page=${currentPage}`);
      }
    }
  }, [router.query.page]);

  return (
    <Box margin={"auto"} w="95%">
      <DashboardHeader page="Dashboard" />
      <Box margin={"auto"} w="95%">
        <Heading mb="2" fontSize="x-large">
          All Blogs
        </Heading>
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
    const response = await axios.get(
      `https://blog-app-adk.vercel.app/api/blog?current_page=${page}&limit=${limit}`
    );
    // Extract the blog posts from the API response data
    const posts = response.data.post;
    const totalPages = response.data.totalPages;

    // Pass the blog posts as props to the page component
    return { props: { posts, totalPages, page } };
  } catch (err) {
    console.error(err);

    // Handle any errors that occur while fetching the data
    // return { props: { posts: [] }, notFound: true };
    return { props: { posts: [] } };
  }
}
