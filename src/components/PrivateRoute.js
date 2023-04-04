import React from "react";

const auth = false;
export default function PrivateRoute({ children }) {
  if (auth === false) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
  return <>{children}</>;
}
