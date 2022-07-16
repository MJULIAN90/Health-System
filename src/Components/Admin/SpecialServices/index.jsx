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
        listSpecialServices.length === 0 ? 'we do not have special services' : listSpecialServices.map(element => {

          return (
            <>
              <Typography >Laboratory: {element[3]}</Typography>
              <Typography >Name service: {element[0].toUpperCase()} </Typography>
              <Typography >Price service: {element[1]} TOCKENS</Typography>
              <Typography >Status service: {element[2] ? "ACTIVE" : "INACTIVE"} </Typography>
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