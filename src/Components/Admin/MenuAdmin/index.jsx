import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BasicServices, SpecialServices, RechargeTockens, PendingRequest, Laboratory, Client } from '../index'

const MenuAdmin = (props) => {
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
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs(hooks) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Pending Request" {...a11yProps(0)} />
                <Tab label="Basic Services" {...a11yProps(1)} />
                <Tab label="Special Services" {...a11yProps(2)} />
                <Tab label="Clients" {...a11yProps(3)} />
                <Tab label="Laboratory" {...a11yProps(4)} />
                <Tab label="Recharge Tockens" {...a11yProps(5)} />
            </Tabs>

            <MenuAdmin value={value} index={0}>
                <PendingRequest {...hooks} />
            </MenuAdmin>
            <MenuAdmin value={value} index={1}>
                <BasicServices {...hooks} />
            </MenuAdmin>
            <MenuAdmin value={value} index={2}>
                <SpecialServices {...hooks} />
            </MenuAdmin>
            <MenuAdmin value={value} index={3}>
                <Client {...hooks}  name={'Client'} />
            </MenuAdmin>
            <MenuAdmin value={value} index={4}>
                < Laboratory {...hooks} name={'Laboratory'} />
            </MenuAdmin>
            <MenuAdmin value={value} index={5}>
                <RechargeTockens {...hooks}  />
            </MenuAdmin>

        </Box>
    );
}
