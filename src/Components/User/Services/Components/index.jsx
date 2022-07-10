import { Box, Button, Container, List } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Service } from '../../../Common';

const ListService = ({ list, method, onBuyService }) => {

  useEffect(() => {
    method();
  }, [])
  
  return (
    <Container id="casa">
      <Box>
        {list.length === 0 ? 'we do not have basic services' :
          <List>
            {
              list.map((service, index) => {
                return (
                  <Service service={service} isBuyService onBuyService={onBuyService} key={index} />
                )
              })
            }
          </List>
        }
      </Box>
    </Container>
  )
}

export default ListService;