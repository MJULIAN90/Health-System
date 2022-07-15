import React from "react";
import { Box, Grid, Typography } from '@mui/material';
import { MenuLaboratory } from "../../Components/Laboratory";
import useLaboratory from '../../Hooks/useLaboratory';

const Laboratory = (props) => {
  const hooks = useLaboratory(props);

  return (
    <Box style={{ width: "100%" }}>
      <Grid container marginBottom={5}>
        <Grid item xs={8}>
          <Typography variant="h3" margin={3}>
            User Laboratory
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "end" }}>
          <Typography variant="h6" marginRight={5}>
            My Balance {hooks.balanceLaboratory}
          </Typography>
        </Grid>
      </Grid>

      <MenuLaboratory {...hooks} />
    </Box>
  );
};

export default Laboratory;