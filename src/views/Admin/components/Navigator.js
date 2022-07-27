import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Divider,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LogoutIcon from "@mui/icons-material/Logout";
import { categories, item, itemCategory } from "./utils";

const Navigator = (props) => {
  const { ...other } = props;
  const navigate = useNavigate();

  const handleScene = (scene) => {
    props.sceneActive(scene);
  };

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, color: "#fff" }}>
          <RocketLaunchIcon size={"large"} />
          <Typography variant='h6' ml={2}>
            {"ROCKET COMPANY"}
          </Typography>
        </ListItem>

        <ListItemButton sx={{ ...item, ...itemCategory }}>
          <ListItemIcon sx={{ py: 1.5 }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </ListItemText>
        </ListItemButton>

        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 3, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, scene }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton sx={item} onClick={() => handleScene(scene)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

        <ListItemButton sx={{ ...item, ...itemCategory }}>
          <ListItemIcon sx={{ py: 1.5 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              navigate("/");
            }}
          >
            Exit
          </ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Navigator;
