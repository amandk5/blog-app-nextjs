import { logoutUser } from "@/redux/auth/auth.action";
import { Button, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { token } = useSelector((store) => store.auth);

  // for dispatching action
  const dispatch = useDispatch();
  // for routing
  const router = useRouter();

  useEffect(() => {});

  if (token === null) {
    router.replace("/login");
  }

  return (
    <div>
      <Heading textAlign="center">Dashboard</Heading>
      <Button
        style={{ float: "right", marginRight: "20px" }}
        bg="#e63946"
        color="white"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </Button>
    </div>
  );
}
