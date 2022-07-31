import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
const Service = (props) => {
  const {
    service,
    onPressChangeStatus = () => {},
    typeService,
    isBuyService,
    onBuyService,
    index,
  } = props;
  const onchangeStatus = () => {
    onPressChangeStatus(service[0]);
  };

  const handleBuyService = () => {
    onBuyService(service[0], service[1]);
  };

  return (
    <TableRow key={index}>
      <TableCell component='th' scope='row'>
        {index + 1}
      </TableCell>
      <TableCell component='th' scope='row'>
        {service[0].toUpperCase()}
      </TableCell>
      <TableCell component='th' scope='row'>
        <Box style={{ display: "flex" }}>
          <Typography mr={2} ml={3}>
            {service[1]}
          </Typography>
          <RocketLaunchIcon />
        </Box>
      </TableCell>

      <TableCell align='center'>{service[2] ? "✅" : "❌"}</TableCell>

      {typeService && (
        <TableCell align='right'>
          <Button onClick={onchangeStatus} disabled={service[2]}>
            🚀
          </Button>
        </TableCell>
      )}
      {typeService && (
        <TableCell align='right'>
          <Button onClick={onchangeStatus} disabled={!service[2]}>
            ⛔
          </Button>
        </TableCell>
      )}

      {isBuyService && (
        <TableCell align='center'>
          <Button
            onClick={handleBuyService}
            disabled={!service[2]}
            variant='contained'
          >
            Buy Service
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default Service;
