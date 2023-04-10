import { logoutUser } from "@/redux/auth/auth.action";
import { Box, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoAndAppName from "./LogoAndAppName";
import { UPDATE_CURRENT_PAGE } from "@/redux/blog/blog.types";

export default function DashboardHeader({ page }) {
  const { token } = useSelector((store) => store.auth);
  // for dispatching action
  const dispatch = useDispatch();

  const router = useRouter();
  console.log(router.pathname);
  // const [currentPage, setCurrentPage] = useState(page);

  if (token === undefined || token === null) {
    router.replace("/login");
  }

  return (
    <>
      <LogoAndAppName />
      {/* <Heading textAlign="center" cursor="pointer">
        <Link href="/dashboard">Dashboard</Link>
      </Heading> */}
      <Box textAlign={"right"}>
        <Button
          style={{
            marginTop: "10px",
            marginRight: "20px",
          }}
          bg="#e63946"
          color="white"
          _hover={{ background: "#e63946" }}
          onClick={() => {
            dispatch(logoutUser());
            // set current page to null
            dispatch({ type: UPDATE_CURRENT_PAGE, payload: null });
          }}
        >
          Logout
        </Button>
      </Box>
      <br />
      {page !== undefined && (
        <Box
          margin={"auto"}
          width={"95%"}
          display="flex"
          columnGap="3"
          rowGap="3"
          flexWrap="wrap"
        >
          {router.pathname === "/dashboard" && (
            <>
              <Link href="/dashboard/create-post">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  Create Blog Post
                </Button>
              </Link>
              <Link href="/dashboard/my-blogs">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  My Blogs
                </Button>
              </Link>
            </>
          )}

          {/* when route is /dashboard/my-blogs */}
          {router.pathname === "/dashboard/my-blogs" && (
            <>
              <Link href="/dashboard/create-post">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  Create Blog Post
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  All Blogs
                </Button>
              </Link>
            </>
          )}

          {/* when url is /dashboard/create-post  */}
          {router.pathname === "/dashboard/create-post" && (
            <>
              <Link href="/dashboard">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  All Blogs
                </Button>
              </Link>
              <Link href="/dashboard/my-blogs">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  My Blogs
                </Button>
              </Link>
            </>
          )}

          {(router.pathname === `/dashboard/my-blogs/[displaymyblog]` ||
            router.pathname === "/dashboard/my-blogs/edit/[editIndex]" ||
            router.pathname === "/dashboard/[displaysingleblog]") && (
            <>
              <Link href="/dashboard/create-post">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  Create Blog Post
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  All Blogs
                </Button>
              </Link>
              <Link href="/dashboard/my-blogs">
                <Button
                  bg="#3a86ff"
                  color={"white"}
                  _hover={{ background: "#3a86ff" }}
                >
                  My Blogs
                </Button>
              </Link>
            </>
          )}
        </Box>
      )}
      <br />
    </>
  );
}
