import React from "react";
import { Box } from "@mui/material";
import useUser from "../../Hooks/useUser";
import { Container } from "../../Components/Common";
import { categoriesUser } from "../../utils";

const User = (props) => {
  const hooks = useUser(props);

  return (
    <Box style={{ width: "100%" }}>
      <Container
        {...hooks}
        {...props}
        screenInital={"buy_tokens"}
        categories={categoriesUser}
        isUser
      />
    </Box>
  );
};

export default User;
