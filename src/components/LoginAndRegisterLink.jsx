import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function LoginAndRegisterLink() {
  return (
    <Box
      display="flex"
      justifyContent="right"
      flexWrap="wrap"
      columnGap="5"
      rowGap="5"
    >
      <Link href="/login">
        <Button bg="#3a86ff" color={"white"} _hover={{ background: "#3a86ff" }}>
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button bg="#e63946" color={"white"} _hover={{ background: "#3a86ff" }}>
          Register
        </Button>
      </Link>
    </Box>
  );
}
