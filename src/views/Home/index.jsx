import React from 'react'
import Footer from '../Footer'
import Nabvar from '../Navbar'
import User from '../User'
import Admin from '../Admin'
import Laboratory from '../Laboratory'
import { Box, Stack } from '@mui/material'

const Home = (props) => {
   const { roleUser } = props

   const Render = () => {
      switch (roleUser.role) {
         case 'Client':
            return <Admin {...props} />
         case 'Laboratory':
            return <User {...props} />
         case 'Admin':
            return <Laboratory {...props} />
         default:
            break;
      }
   }

   return (
      <Box sx={{ width: '100%' }}>
         <Stack spacing={2}>
            <Nabvar />
            {Render()}
            <Footer />
         </Stack>
      </Box>
   )
}

export default Home;