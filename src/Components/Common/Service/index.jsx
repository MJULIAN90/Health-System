import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

const Service = ({
  service,
  onPressChangeStatus = () => {},
  typeService = false,
  isBuyService = false,
  onBuyService,
  index,
}) => {
  const onchangeStatus = () => {
    onPressChangeStatus(service[0]);
  };

  const handleBuyService = () => {
    onBuyService(service[0]);
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
      <TableCell align='right'>
        {typeService && (
          <Button onClick={onchangeStatus} disabled={!service[2]}>
            <CheckCircleRoundedIcon />
          </Button>
        )}
      </TableCell>
      <TableCell align='right'>
        {typeService && (
          <Button onClick={onchangeStatus} disabled={service[2]}>
            <RemoveCircleRoundedIcon />
          </Button>
        )}
      </TableCell>

      <TableCell align='right'>
        {isBuyService && (
          <Button onClick={handleBuyService} disabled={!service[2]}>
            Buy Service
          </Button>
        )}
      </TableCell>
    </TableRow>

    // <Typography > {service[0]} </Typography>
    // <Typography > {service[1]} </Typography>
    // <Typography > {service[2] ? 'Activo' : 'Inactive'} </Typography>

    // {
    //     typeService &&
    //         <Button onClick={onchangeStatus} disabled={!service[2]}>
    //             deactivate
    //         </Button>
    // }

    // {
    //     typeService &&
    //         <Button onClick={onchangeStatus} disabled={service[2]}>
    //             activate
    //         </Button>
    // }

    // {
    //     isBuyService &&
    //     <Button onClick={handleBuyService} disabled={!service[2]}>
    //         Buy Service
    //     </Button>
    // }
  );
};

export default Service;
