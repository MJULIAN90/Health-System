import React, {  useMemo } from 'react'
import { InfoClient } from '../../Common'

const Client = ({ listClients, getClients }) => {

   useMemo(
     async () => {
       await getClients()
    },[listClients],)
  
  return (
    <InfoClient name={'Client'} list={listClients} /> 
  )
};

export default Client