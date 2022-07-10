import React, {  useEffect } from 'react'
import { InfoClient } from '../../Common'

const Client = ({ listClients, getClients }) => {

    useEffect(() => {
      getClients()
    }, [])

  return (
    <InfoClient name={'Client'} list={listClients} /> 
  )
};

export default Client