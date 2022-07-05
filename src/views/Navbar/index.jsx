import React from 'react'
import { Container, Avatar, Typography } from '@mui/material';
import { images } from '../../Assets';

const Nabvar = ({ balanceEthers , account}) => {
  return (
      <Container maxWidth={false} style={{backgroundColor:"black", height:100}}>
      <img src={images.logo} height={120} width={120} alt='ERROR' style={{ position: "absolute" }} />
      <Typography> Address {account[0]} </Typography>
      <Typography> balanceEthers {balanceEthers} </Typography>

      </Container>
  )
}

export default Nabvar