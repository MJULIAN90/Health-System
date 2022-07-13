import React, { useCallback, useEffect, useMemo } from 'react'
import { Container, List, Box } from '@mui/material';
import { CreateService } from './Components';
import { Service } from '../../Common'


const BasicServices = ({ getBasicServices, listBasicServices, onChangeStatusService, getCreateService }) => {

  useEffect(() => {
    getBasicServices()
  }, [])

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
                  <Service service={service} typeService onPressChangeStatus={onPressChangeStatus} />
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