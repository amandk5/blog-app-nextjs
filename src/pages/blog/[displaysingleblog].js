import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import LoginAndRegisterLink from "@/components/LoginAndRegisterLink";
import LogoAndAppName from "@/components/LogoAndAppName";

export default function DisplayBlogSingle() {
  const { single_blog_to_display } = useSelector((store) => store.blog);
  console.log(single_blog_to_display);
  return (
    <Box margin={"auto"} w="95%">
      <LogoAndAppName />
      <LoginAndRegisterLink />
      <br />
      <Link href="/">
        <ArrowBackIcon fontSize="x-large" />
      </Link>

      {single_blog_to_display !== "" && (
        <Box my="5" p="5" border="1px solid gainsboro" borderRadius="0.5rem">
          <Box
            dangerouslySetInnerHTML={createMarkup(single_blog_to_display)}
          ></Box>
        </Box>
      )}
    </Box>
  );
}

// for creating markup of html file
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}
