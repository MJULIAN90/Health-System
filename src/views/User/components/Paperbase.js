import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import { useState } from "react";
import Footer from "../../Footer";
import { theme } from "../../../utils";

const drawerWidth = 256;

const Container = (hooks) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [sceneActive, setSceneActive] = useState("buy_tokens");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant='temporary'
              open={mobileOpen}
              onClose={handleDrawerToggle}
              {...hooks}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
            sceneActive={setSceneActive}
            {...hooks}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} {...hooks} />
          <Box
            component='main'
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Content {...hooks} scene={sceneActive} />
          </Box>
          <Box component='footer' sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Container;
