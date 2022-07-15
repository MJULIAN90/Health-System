import React, { useEffect } from 'react'
import {Service} from '../../Common'
import { Container, List, Box, Typography } from '@mui/material';

const SpecialServices = ({ listSpecialServices, getSpecialServices }) => {

  useEffect(() => {
    getSpecialServices ()
  }, [])
  
  return (
    <Container >
      {
        listSpecialServices.length === 0 ? 'we do not have users' : listSpecialServices.map(element => {

          return (
            <>
              <Typography >Contract Laboratory: {element[0]} </Typography>
              <Typography >Contract Client: {element[1]} </Typography>
              <Typography >Name service: {element[4]} </Typography>
              <Typography >Price: {element[3]} tockens</Typography>
            </>
          )
        })
      }
    </Container>
    // <Container>
    //   <Box>
    //     {listSpecialServices.length === 0 ? 'we do not have special services' :
    //       <List>
    //         {
    //           listSpecialServices.map(service => {
    //             return (
    //               <Service {...service} />
    //             )
    //           })
    //         }
    //       </List>
    //     }
    //   </Box>
    // </Container>
  )
}

export default SpecialServices