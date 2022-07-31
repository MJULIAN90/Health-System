import React, { useEffect } from "react";
import User from "../User";
import Admin from "../Admin";
import Laboratory from "../Laboratory";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const { roleUser, getRole } = props;

  useEffect(() => {
    getRole();
  }, []);

  const Render = () => {
    if (roleUser.status === true) {
      switch (roleUser.role) {
        case "Admin":
          return <Admin {...props} />;
        case `Client`:
          return <User {...props} />;
        case "Laboratory":
          return <Laboratory {...props} />;
        default:
          break;
      }
    } else {
      return navigate("/");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}> {Render()}</Stack>
    </Box>
  );
};

export default Home;
