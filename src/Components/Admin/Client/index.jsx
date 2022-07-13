import React, {  useEffect } from 'react'
import { InfoClient } from '../../Common'

const Client = ({ listClients, getClients, onBanUser, onUnBanUser }) => {

    useEffect(() => {
      getClients()
    }, [])

  return (
    <InfoClient name={'Client'} list={listClients} banUser={onBanUser} unBanUser={onUnBanUser} /> 
  )
};

export default Client