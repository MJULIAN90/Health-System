import { Box } from "@mui/material";
import React from "react";
import useAdmin from "../../Hooks/useAdmin";
import Container from "./components/Paperbase";

const Admin = (props) => {
  
  const hooks = useAdmin(props);

  return (
    <Box style={{ width: "100%" }}>
      <Container {...hooks} {...props}/>
    </Box>
  );
};

export default Admin;
