import { Box } from "@mui/material";
import React from "react";
import useUser from "../../Hooks/useUser";
import Container from "./components/Paperbase";

const User = (props) => {
  const hooks = useUser(props);

  return (
    <Box style={{ width: "100%" }}>
      <Container {...hooks} {...props} />
    </Box>
  );
};

export default User;
