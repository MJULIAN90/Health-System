import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { MenuUser } from '../../Components/User';
import useUser from '../../Hooks/useUser';

const User = (props) => {
  const hooks = useUser(props);

  return (
    <Box style={{ width: "100%" }}>
      <Grid container marginBottom={5}>
        <Grid item xs={8}>
          <Typography variant='h3' margin={3} > User account  {props.account[0]}</Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "end" }} >
          <Typography variant='h6' marginRight={5} > # Contract {hooks.numberContract}</Typography>
          <Typography variant='h6' marginRight={5}> My tockens {hooks.balanceClient}</Typography>
          {
            hooks.numberContract == 0 &&
            <Button onClick={hooks.getActiveContract} disabled={hooks.numberContract !== 0}>   {hooks.numberContract === 0 ? 'Activate Contract' : 'Contract active'}  </Button>
          }

        </Grid>
      </Grid>

      <MenuUser {...hooks} />
    </Box>
  )
}

export default User;