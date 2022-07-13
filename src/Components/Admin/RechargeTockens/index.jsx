import { Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'
import { Form } from  '../../Common'

const RechargeTockens = ({ getRechargeTokens }) => {

  const onRechargeTockens = (amount) => {
    getRechargeTokens (amount)
  }
  return (
    <Container 
    style={{display: "flex", flexDirection: "column" , width:"100%"}}>

      <Typography >Here we can add more tockens for our contract</Typography>

      <Form method={onRechargeTockens} textButton={'Recharge tockens'} />
      
    </Container>
  )
}

export default RechargeTockens