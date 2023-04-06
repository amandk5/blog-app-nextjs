import DashboardHeader from "@/components/DashboardHeader";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function DisplaySingleBlog() {
  const { single_blog_to_display } = useSelector((store) => store.blog);

  return (
    <Box margin={"auto"} w="95%">
      <DashboardHeader page="MyBlogs" />

      <Link href="/dashboard">
        <ArrowBackIcon fontSize="x-large" />
      </Link>

      <Box my="5" p="5" border="1px solid gainsboro" borderRadius="0.5rem">
        <Box
          dangerouslySetInnerHTML={createMarkup(single_blog_to_display)}
        ></Box>
      </Box>
    </Box>
  );
}

// for creating markup of html file
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}
