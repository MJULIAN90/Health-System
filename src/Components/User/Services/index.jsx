import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@mui/material';
import ListService from './Components';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Services = ( {listBasicService, listSpecialService, getListBasicServices, getListSpecialServices} ) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 1000}}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="basicService" {...a11yProps(0)} />
          <Tab label="specialService" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Box >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListService list={listBasicService} method={getListBasicServices}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListService list={listSpecialService} method={getListSpecialServices} />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default Services;