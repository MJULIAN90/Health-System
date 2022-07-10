import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';

const ServiceHistory = ({listServiceHistory, getServiceHistory}) => {
  
  useEffect(() => {
    getServiceHistory();
  }, [])

  return (
    <Container id="tr">
      {
        listServiceHistory && listServiceHistory.length > 0 && listServiceHistory.map(element => {

          return(
            <Typography > {element} </Typography>
          )
        })
      }
    </Container>
  )
}

export default ServiceHistory;