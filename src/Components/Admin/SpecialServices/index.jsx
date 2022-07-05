import React from 'react'
import {Service} from '../../Common'
import { Container, List, Box } from '@mui/material';

const SpecialServices = ({ listSpecialServices }) => {
  return (
    <Container>
      <Box>
        {listSpecialServices.length === 0 ? 'we do not have special services' :
          <List>
            {
              listSpecialServices.map(service => {
                return (
                  <Service {...service} />
                )
              })
            }
          </List>
        }
      </Box>
    </Container>
  )
}

export default SpecialServices