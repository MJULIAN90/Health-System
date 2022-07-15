import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {} from "../index";
import { Button } from "@mui/material";
import CancelContract from "../CancelContract";
import WithdrawalMoney from "../WithdrawalMoney";
import Services from "../Services";
import Users from "../Users";

const MenuLaboratory = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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
        height: 600,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Laboratory Information" {...a11yProps(0)} />
        <Tab label="My Services" {...a11yProps(1)} />
        <Tab label="History users" {...a11yProps(2)} />
        <Tab label="Withdrawal Money" {...a11yProps(3)} />
        <Tab label="Cancel Contract" {...a11yProps(4)} onClick={() => { hooks.cancelContract ()}}/>
      </Tabs>

      <MenuLaboratory value={value} index={0}>
      </MenuLaboratory>

      <MenuLaboratory value={value} index={1}>
        <Services {...hooks}/>
      </MenuLaboratory>

      <MenuLaboratory value={value} index={2}>
        <Users {...hooks}/>
      </MenuLaboratory>

      <MenuLaboratory value={value} index={3}>
        < WithdrawalMoney {...hooks}/>
      </MenuLaboratory>

      <MenuLaboratory value={value} index={4}>
        <Typography> carreta para cuando vaya a cancelar</Typography>
      </MenuLaboratory>
    </Box>
  );
}
