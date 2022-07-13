import React from 'react'
import { Container, Typography } from '@mui/material';


const Footer = () => {
  return (
    <Container>    
      <Typography>© {new Date().getFullYear()} Original designs by </Typography>
      <Typography>Martin Julian Ruiz Velásquez </Typography>
      <Typography>Andrés Felipe Velásquez Trujillo</Typography>
   </Container>
  )
}

export default Footer