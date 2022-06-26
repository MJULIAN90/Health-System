import { Container } from '@mui/material'
import React, { useCallback, useEffect } from 'react'

const ListRequest = ({ name, getPendintRequest, listPendingClient, listPendingLaboratory }) => {

  useEffect(() => {
    getPendintRequest(name)
  }, [name])
  

  // useCallback(
  //   () => {
  //     getPendintRequest (name)
  //   },
  //   [name],
  // )
  
  return (
    <Container>
      {
        name === 'Client' ? 
        <>
            {listPendingClient}
        </>
        :
        <>
            {listPendingLaboratory}
        </>

      }
      
      
    </Container>
  )
}

export default ListRequest