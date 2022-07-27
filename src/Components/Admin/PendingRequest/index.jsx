import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@mui/material";
import ListRequest from "./components/ListRequest";
import { SearchBar } from "../../Common";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const propTabs = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const PendingRequest = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <SearchBar />
      <AppBar position='static' style={{ marginTop: 20 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='secondary'
          textColor='inherit'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='Clients' {...propTabs(0)} />
          <Tab label='Partners' {...propTabs(1)} />
        </Tabs>
      </AppBar>
      <Box>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListRequest name={"Client"} {...props} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListRequest name={"Laboratory"} {...props} />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default PendingRequest;
