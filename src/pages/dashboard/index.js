import DashboardHeader from "@/components/DashboardHeader";
import DisplayBlogs from "@/components/DisplayBlogs";
import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";

export default function Dashboard({ posts }) {
  const [blogPosts, setBlogPosts] = useState(posts);

  return (
    <Box margin={"auto"} w="95%">
      <DashboardHeader page="Dashboard" />
      <Box margin={"auto"} w="95%">
        <Heading mb="2" fontSize="x-large">
          All Blogs
        </Heading>
        {/* display blogs here  */}
        {blogPosts.length !== 0 && <DisplayBlogs posts={blogPosts} />}
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    // Make a GET request to your API endpoint for retrieving blog posts
    const response = await axios.get("http://localhost:3000/api/blog");
    // Extract the blog posts from the API response data
    const posts = response.data.post;

    // Pass the blog posts as props to the page component
    return { props: { posts } };
  } catch (err) {
    console.error(err);

    // Handle any errors that occur while fetching the data
    // return { props: { posts: [] }, notFound: true };
    return { props: { posts: [] } };
  }
}
