import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { MenuAdmin  } from '../../Components/Admin';
import useAdmin from '../../Hooks/useAdmin';
import Container from './components/Paperbase';

const Admin = (props) => {
  const hooks = useAdmin(props)
  const { balanceContract } = hooks

  return (
    <Box style={{width:"100%"}}>
{/*       <Grid container marginBottom={5}>
        <Grid item >
          <Typography variant='h3' margin={3} > User name</Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "end" }} >
          <Typography variant='h6' marginRight={5} marginTop={5}> Balance Contract {balanceContract}</Typography>
        </Grid>
      </Grid>

       */}
      <Container {...hooks} />
    </Box>
  )
}

export default Admin