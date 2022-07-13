import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { MenuUser } from '../../Components/User';
import useUser from '../../Hooks/useUser';

const User = (props) => {
  const hooks = useUser(props);

  return (
    <Box style={{ width: "100%" }}>
      <Grid container marginBottom={5}>
        <Grid item xs={6}>
          <Typography variant='h6' margin={3} > User account  {props.account[0]}</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "end" }} >
          <Typography variant='h6' marginRight={5} > # Contract:  {hooks.numberContract !== 0 ? hooks.numberContract :'Not available'}</Typography>
          <Typography variant='h6' marginRight={5}> Tockens {hooks.balanceClient}</Typography>
        </Grid>
      </Grid>

      <MenuUser {...hooks} />
    </Box>
  )
}

export default User;