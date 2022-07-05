import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { MenuAdmin } from '../../Components/Admin';
import useAdmin from '../../Hooks/useAdmin';

const Admin = (props) => {
  const hooks = useAdmin(props)

  return (
    <Box style={{width:"100%"}}>
      <Grid container marginBottom={5}>
        <Grid item xs={8}>
          <Typography variant='h3' margin={3} > User name</Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "end" }} >
          <Typography variant='h6' marginRight={5} > Balance Contract 0</Typography>
          <Typography variant='h6' marginRight={5}> My Balance 0</Typography>
        </Grid>
      </Grid>

      <MenuAdmin {...hooks}/>
    </Box>
  )
}

export default Admin