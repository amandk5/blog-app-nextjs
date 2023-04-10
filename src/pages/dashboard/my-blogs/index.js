import DashboardHeader from "@/components/DashboardHeader";
import DisplayBlogs from "@/components/DisplayBlogs";
import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function MyBlogs() {
  const { token } = useSelector((store) => store.auth);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // send user token as header to api
    axios
      .get("/api/blog?current_page=1&limit=10", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((res) => {
        // console.log(res);
        setUserPosts(res.data.post);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin={"auto"} w="95%">
      <DashboardHeader page="MyBlogs" />
      <Box margin={"auto"} w="95%">
        <Heading mb="2" fontSize="x-large">
          My Blogs
        </Heading>
        {/* display blogs here  */}
        {userPosts.length !== 0 && <DisplayBlogs posts={userPosts} />}
      </Box>
    </Box>
  );
}
