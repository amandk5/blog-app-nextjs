import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaBlogger } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function LogoAndAppName() {
  const { token } = useSelector((store) => store.auth);

  return (
    <>
      <Box textAlign="center" mt="3" mb="5" textUnderlineOffset="10px">
        <Link href={token !== null ? "/dashboard" : "/"}>
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
