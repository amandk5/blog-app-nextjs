import { UPDATE_CURRENT_PAGE } from "@/redux/blog/blog.types";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaBlogger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function LogoAndAppName() {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Box textAlign="center" mt="3" mb="5" textUnderlineOffset="10px">
        <Link
          href={token !== null ? "/dashboard" : "/"}
          onClick={() => {
            dispatch({ type: UPDATE_CURRENT_PAGE, payload: 1 });
          }}
        >
          <Heading display="inline">
            <span
              style={{
                display: "inline-block",
                marginRight: "10px",
                color: "#e76f51",
                marginTop: "2px",
              }}
            >
              <FaBlogger />
            </span>
            Blog{" "}
            <Text color="#e76f51" display="inline">
              App
            </Text>
          </Heading>
        </Link>
      </Box>
    </>
  );
}
