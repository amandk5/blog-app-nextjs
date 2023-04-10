import { loginUser } from "@/redux/auth/auth.action";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LogoAndAppName from "@/components/LogoAndAppName";
import { UPDATE_CURRENT_PAGE } from "@/redux/blog/blog.types";

export default function Login() {
  // get token from AuthReducer
  const { token } = useSelector((store) => store.auth);

  // for dispatching action
  const dispatch = useDispatch();
  // for routing
  const router = useRouter();

  const [userCreds, setUserCreds] = useState({
    email: "",
    password: "",
  });

  // function to change value inside userCreds Object
  const handleInputChange = (e) => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();

    // dispatch function
    dispatch(loginUser(userCreds));
    // also set the current page to 1
    dispatch({ type: UPDATE_CURRENT_PAGE, payload: null });
    // reset userCreds Object
    setUserCreds({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (token !== null) {
      router.replace("/dashboard");
    }
  }, [token]);

  return (
    <>
      <LogoAndAppName />
      <br />
      <div className="register-div">
        <Heading fontSize="x-large">LOGIN</Heading>
        <br />
        <form onSubmit={loginHandler}>
          <Input
            required
            type="email"
            placeholder="Enter Email"
            name="email"
            value={userCreds.email}
            onChange={handleInputChange}
          />
          <Input
            required
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userCreds.password}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <Button bg="#3a86ff" color="white" px="5" type="submit">
            Login
          </Button>
        </form>
        <br />
        <Box mt="2">
          Not Registered?{" "}
          <Text display="inline" color="red">
            <Link href="/register">Register Here</Link>
          </Text>
        </Box>
      </div>
    </>
  );
}
