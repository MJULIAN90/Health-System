import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BuyTokens, CancelContract, ServiceHistory, Services } from "../index";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MenuUser = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(hooks) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 800,
        // backgroundColor:"#101F33"
      }}
    >
      <Tabs
        orientation='vertical'
        variant='fullWidth'
        value={value}
        textColor='primary'
        onChange={handleChange}
        indicatorColor='primary'
        aria-label='hola'
        TabIndicatorProps={{
          style: {
            backgroundColor: "white",
          },
        }}
        sx={{
          borderRight: 1,
          backgroundColor: "lightgray",
          minWidth: 255,
        }}
        // TabIndicatorProps={{style: {background:'white', color:"white"}}}
      >
        <Tab label='Buy Tokens' {...a11yProps(0)} />
        <Tab label='Services' {...a11yProps(1)} />
        <Tab label='Service History' {...a11yProps(2)} />
        {hooks.numberContract === 0 ? (
          <Tab
            label='Active Contract'
            {...a11yProps(3)}
            onClick={hooks.getActiveContract}
          />
        ) : (
          <Tab
            label='Cancel Account'
            {...a11yProps(3)}
            onClick={hooks.cancelContract}
          />
        )}
      </Tabs>
      <MenuUser value={value} index={0}>
        <BuyTokens {...hooks} />
      </MenuUser>
      <MenuUser value={value} index={1}>
        <Services {...hooks} />
      </MenuUser>
      <MenuUser value={value} index={2}>
        <ServiceHistory {...hooks} />
      </MenuUser>
      <MenuUser value={value} index={3}>
        <Typography>
          {hooks.numberContract === 0
            ? "Aca texto para explcar que hace"
            : "texto para explcar que hace"}{" "}
        </Typography>
      </MenuUser>
    </Box>
  );
}
