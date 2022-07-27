import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { BasicServices, SpecialServices, RechargeTockens, PendingRequest, Laboratory, Client, History } from '../../../Components/Admin'

export default function Content(props) {

    const { scene } = props

    const renderScene = () => {
        switch (scene) {
            case 'pending_request':
                return <PendingRequest {...props }/>
            case 'basic_services':
                return <BasicServices {...props} />
            case 'special_services':
                return <SpecialServices {...props} />
            case 'clients':
                return <Client name={'Client'} {...props} />
            case 'partners':
                return <Laboratory name={'Laboratory'} {...props} />
            case 'history':
                return <History {...props} />
            case 'recharge_tockens':
                return <RechargeTockens {...props} />
            default:
                break;
        }
    }
   
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden', height:600 }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
{/*                 {scene !== 'recharge_tockens' && 
                
                <Toolbar>
                    <Grid container spacing={2} alignItems="center" >
                        <Grid item>
                            <SearchIcon color="inherit" sx={{ display: 'block' }} />
                        </Grid>
                        <Grid item xs >
                            <TextField
                                fullWidth
                                placeholder="Search by email address, phone number, or user UID"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: 'default' },
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item >
                            <Button variant="contained" sx={{ mr: 0 }}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
                } */}
            </AppBar>
                {renderScene()}
        </Paper>
    );
}