import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useMediaQuery, CssBaseline, Box } from "@mui/material";
import { Navigator, Header, Footer } from "../";
import { theme } from "../../../utils";
import { Content } from "../";

const drawerWidth = 256;

const Container = (props) => {
  const { screenInital } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [sceneActive, setSceneActive] = useState(screenInital);

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
              {...props}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
            sceneActive={setSceneActive}
            {...props}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} {...props} />
          <Box
            component='main'
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Content {...props} scene={sceneActive} />
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
