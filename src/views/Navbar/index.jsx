import React from 'react'
import { Container, Avatar } from '@mui/material';
import { images } from '../../Assets';

const Nabvar = () => {
  return (
      <Container maxWidth={false} style={{backgroundColor:"black", height:100}}>
      <img src={images.logo} height={120} width={120} alt='ERROR' style={{ position: "absolute" }} />
      Nabvar

      </Container>
  )
}

export default Nabvar