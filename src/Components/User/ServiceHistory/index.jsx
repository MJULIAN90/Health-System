import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';

const ServiceHistory = ({listServiceHistory, getServiceHistory}) => {
  
  useEffect(() => {
    getServiceHistory();
  }, [])

  return (
    <Container >
      {
        listServiceHistory && listServiceHistory.length > 0 && listServiceHistory.map(element => {

          return(
            <>
              <Typography >Seller {element[0]} </Typography>
              <Typography >Type service {element[2]} </Typography>
              <Typography >Name service {element[4]} </Typography>
              <Typography >Price {element[3]} </Typography>
            </>
          )
        })
      }
    </Container>
  )
}

export default ServiceHistory;