import React, { useCallback, useEffect, useMemo } from 'react'
import { Container, List, Box } from '@mui/material';
import { CreateService } from './Components';
import { Service } from '../../Common'


const BasicServices = ({ getBasicServices, listBasicServices, onChangeStatusService, getCreateService }) => {

  useEffect(() => {
    getBasicServices()
  }, [])


  // para cuando le de click y quiera cambiar status
  const onPressChangeStatus = (name) => {
    onChangeStatusService(name)
  }

  return (
    <Container>
      <CreateService getCreateService={getCreateService} />
      <Box>
        {listBasicServices.length === 0 ? 'we do not have basic services' :
          <List>
            {
              listBasicServices.map(service => {
                return (
                  <Service onPressChangeStatus={onPressChangeStatus} service={service} typeService />
                )
              })
            }
          </List>
        }
      </Box>
    </Container>
  )
}

export default BasicServices