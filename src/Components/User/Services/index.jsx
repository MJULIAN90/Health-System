import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@mui/material";
import ListService from "./Components";
import { SearchBar } from "../../Common";

function TabPanel(props) {
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
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Services = (props) => {
  const {
    listBasicService,
    listSpecialService,
    getListBasicServices,
    getListSpecialServices,
    getUseBasicService,
    getUseSpecialService,
  } = props;
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
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
          <Tab label='Basic Services' {...a11yProps(0)} />
          <Tab label='Special Services' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Box>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListService
            list={listBasicService}
            method={getListBasicServices}
            onBuyService={getUseBasicService}
            type={"basic"}
            {...props}
          />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListService
            list={listSpecialService}
            method={getListSpecialServices}
            onBuyService={getUseSpecialService}
            type={"special"}
            {...props}
          />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Services;
