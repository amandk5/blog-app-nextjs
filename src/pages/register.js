import LogoAndAppName from "@/components/LogoAndAppName";
import { registerUser } from "@/redux/auth/auth.action";
import { Box, Button, Heading, Input, Select, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    user_type: "",
    confirm_password: "",
  });

  // function to change value inside userInfo Object
  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // function to trigger user registration function
  const userRegisterHandler = async (e) => {
    e.preventDefault();

    // send userInfo object to registerUser function
    await registerUser(userInfo)
      .then((res) => alert("registered successfully"))
      .catch((err) => alert("failed to register"));

    // reset userInfo Object
    setUserInfo({
      email: "",
      password: "",
      user_type: "",
      confirm_password: "",
    });
  };

  useEffect(() => {
    // console.log(userInfo);
  }, [userInfo]);

  return (
    <>
      <LogoAndAppName />
      <br />
      <Box className="register-div">
        <Heading fontSize="x-large">REGISTER</Heading>
        <br />
        <form onSubmit={userRegisterHandler}>
          <Input
            required
            type="email"
            placeholder="Enter Email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <Input
            required
            type="password"
            placeholder="Set Password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
          />
          <Input
            required
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            value={userInfo.confirm_password}
            onChange={handleInputChange}
          />
          <Select
            required
            name="user_type"
            value={userInfo.user_type}
            onChange={handleInputChange}
          >
            <option value="">Select User Type</option>
            <option value="reader">reader</option>
            <option value="author">author</option>
          </Select>
          <br />
          <br />
          <Button bg="#e63946" color="white" type="submit">
            Register
          </Button>
        </form>
        <br />
        <Box mt="2">
          Already Registered?{" "}
          <Text display="inline" color="#3a86ff">
            <Link href="/login">Login</Link>
          </Text>
        </Box>
      </Box>
    </>
  );
}
