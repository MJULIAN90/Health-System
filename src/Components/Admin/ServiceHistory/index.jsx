import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';

const ServiceHistory = ({ getHistoryTransaction, listServiceHistory }) => {

  useEffect(() => {
    getHistoryTransaction();
  }, [])

  return (
    <Container >
      {
        listServiceHistory && listServiceHistory.length > 0 ? listServiceHistory.map(element => {

          return(
            <>
              <Typography >Laboratory {element[0]} </Typography>
              <Typography >Client {element[1]} </Typography>
              <Typography >Type service {element[2]} </Typography>
              <Typography >Name service {element[4]} </Typography>
              <Typography >Price {element[3]} </Typography>
            </>
          )
        }) : 'No transaction history'
      }
    </Container>
  )
}

export default ServiceHistory;