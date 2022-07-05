import { Button, Container, TextField } from '@mui/material'
import React from 'react'

const RechargeTockens = ({ getRechargeTokens }) => {

  const onRechargeTockens = (amount) => {
    getRechargeTokens (amount)
  }
  return (
    <Container 
    style={{display: "flex", flexDirection: "column" , width:"100%"}}>

      <TextField id="quantity" label="Quantity" variant="outlined" />
      <Button onClick={onRechargeTockens} >Buy Tokens</Button>
      
    </Container>
  )
}

export default RechargeTockens