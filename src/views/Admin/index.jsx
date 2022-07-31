import React from "react";
import { Box } from "@mui/material";
import useAdmin from "../../Hooks/useAdmin";
import { categoriesAdmin } from "../../utils";
import { Container } from "../../Components/Common";

const Admin = (props) => {
  const hooks = useAdmin(props);

  return (
    <Box style={{ width: "100%" }}>
      <Container
        {...hooks}
        {...props}
        screenInital={"pending_request"}
        categories={categoriesAdmin}
        isAdmin
      />
    </Box>
  );
};

export default Admin;
