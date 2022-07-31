import React, { useMemo } from "react";
import { AppBar, Paper } from "@mui/material";
import {
  renderSceneAdmin,
  renderSceneUser,
  renderSceneLaboratory,
} from "./utils";

const Content = (props) => {
  const {
    setListRenderFilter,
    roleUser: { role },
    scene,
  } = props;

  useMemo(() => {
    setListRenderFilter([]);
  }, [scene]);

  const renderScene = () => {
    switch (role) {
      case "Admin":
        return renderSceneAdmin(props);
      case "Client":
        return renderSceneUser(props);
      case "Laboratory":
        return renderSceneLaboratory(props);
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", height: 600 }}
    >
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      />

      {renderScene()}
    </Paper>
  );
};

export default Content;
