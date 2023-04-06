import {
  SINGLE_BLOG_TO_DISPLAY,
  SINGLE_MY_BLOG_TO_DISPLAY,
} from "@/redux/blog/blog.types";
import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DisplayBlogs({ posts }) {
  const router = useRouter();

  // console.log(router.pathname);
  const dispatch = useDispatch();

  return (
    <div>
      {posts.map((postData, index) => (
        <Box
          key={index}
          // key={router.pathname === "/dashboard" ? postData : postData.id}
          my="5"
          p="5"
          border="1px solid gainsboro"
          borderRadius="0.5rem"
          _hover={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px " }}
        >
          {/* if url is /dashboard or /  */}
          {(router.pathname === "/dashboard" || router.pathname === "/") && (
            <Box
              dangerouslySetInnerHTML={createMarkup(postData)}
              className="displayBlogDiv"
              noOfLines={5}
            ></Box>
          )}

          {/* if url is /dashboard/my-blogs  */}
          {router.pathname === "/dashboard/my-blogs" && (
            <Box
              dangerouslySetInnerHTML={createMarkup(postData.content)}
              className="displayBlogDiv"
              noOfLines={5}
            ></Box>
          )}
          <Box mt="2" textAlign="right">
            {/* if url is /  */}
            {router.pathname === "/" && (
              <Link href={`/blog/${index + 1}`}>
                <Button
                  px="10"
                  bg="#e76f51"
                  color="white"
                  opacity="0.9"
                  _hover={{ opacity: "1" }}
                  onClick={() => {
                    dispatch({
                      type: SINGLE_BLOG_TO_DISPLAY,
                      payload: postData,
                    });
                  }}
                >
                  Read
                </Button>
              </Link>
            )}
            {/* if url is "/dashboard"  */}
            {router.pathname === "/dashboard" && (
              <Link href={`/dashboard/${index + 1}`}>
                <Button
                  px="10"
                  bg="#e76f51"
                  color="white"
                  opacity="0.9"
                  _hover={{ opacity: "1" }}
                  onClick={() => {
                    dispatch({
                      type: SINGLE_BLOG_TO_DISPLAY,
                      payload: postData,
                    });
                  }}
                >
                  Read
                </Button>
              </Link>
            )}
            {/* if url is /dashboard/my-blogs */}
            {router.pathname === "/dashboard/my-blogs" && (
              <Link href={`/dashboard/my-blogs/${index + 1}`}>
                <Button
                  px="10"
                  bg="#e76f51"
                  color="white"
                  opacity="0.9"
                  _hover={{ opacity: "1" }}
                  onClick={() => {
                    dispatch({
                      type: SINGLE_MY_BLOG_TO_DISPLAY,
                      payload: postData,
                    });
                  }}
                >
                  Read
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      ))}
    </div>
  );
}

// for creating markup of html file
function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}
