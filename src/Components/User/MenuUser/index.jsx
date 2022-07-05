import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BuyTokens, CancelContract, ServiceHistory, Services } from '../index';
import { Button } from '@mui/material';

const MenuUser = (props) => {
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
                <Tab label="Buy Tokens" {...a11yProps(0)} />
                <Tab label="Services" {...a11yProps(1)} />
                <Tab label="Service History" {...a11yProps(2)} />
                <Tab label="Cancel Contract" {...a11yProps(3)} />
            </Tabs>

            {/* aca puedo refactorizar los servicios en solo componente*/}
            <MenuUser value={value} index={0}>
                <BuyTokens {...hooks}/>
            </MenuUser>
            <MenuUser value={value} index={1}>
                <Services {...hooks}/>
            </MenuUser>
            {/* aca puedo refactorizar los usuarios en solo componente*/}
            <MenuUser value={value} index={2}>
                <ServiceHistory {...hooks}/>
            </MenuUser>
            <MenuUser value={value} index={3}>
                < CancelContract {...hooks}/>
            </MenuUser>
        </Box>
    );
}
