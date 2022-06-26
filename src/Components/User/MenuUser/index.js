import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BasicServices, HistoryServices, Laboratory, SpecialServices, Users, RechargeTockens, PendingRequest } from '../index'
import { Button } from '@mui/material';

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

export default function VerticalTabs() {
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
                <Tab label="Users" {...a11yProps(3)} />
                <Tab label="Laboratory" {...a11yProps(4)} />
                <Tab label="history of services" {...a11yProps(5)} />
                <Tab label="Recharge Tockens" {...a11yProps(6)} />
            </Tabs>

            <MenuAdmin value={value} index={0}>
                <PendingRequest />
            </MenuAdmin>
            {/* aca puedo refactorizar los servicios en solo componente*/}
            <MenuAdmin value={value} index={1}>
                <BasicServices />
            </MenuAdmin>
            <MenuAdmin value={value} index={2}>
                <SpecialServices />
            </MenuAdmin>
            {/* aca puedo refactorizar los usuarios en solo componente*/}
            <MenuAdmin value={value} index={3}>
                <Users />
            </MenuAdmin>
            <MenuAdmin value={value} index={4}>
                < Laboratory />
            </MenuAdmin>
            <MenuAdmin value={value} index={5}>
               <HistoryServices />
            </MenuAdmin>
            <MenuAdmin value={value} index={6}>
                <RechargeTockens />
            </MenuAdmin>

        </Box>
    );
}
