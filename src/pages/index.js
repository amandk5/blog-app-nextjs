import { SET_INITIAL_STATE } from "@/redux/auth/auth.types";
import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Home() {
  const { token } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  // for routing
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("blog_app_user_token") !== undefined) {
      let token = localStorage.getItem("blog_app_user_token");
      dispatch({ type: SET_INITIAL_STATE, payload: token });
    } else {
      dispatch({ type: SET_INITIAL_STATE, payload: null });
    }
  }, [token]);

  if (token !== null) {
    router.replace("/dashboard");
  } else {
    router.replace("/login");
  }

  return (
    <div>
      <Heading textAlign="center">Home Page</Heading>
      {/* <Link href="/login">Login</Link>&nbsp;&nbsp;
      <Link href="/register">Register</Link> */}
    </div>
  );
}
