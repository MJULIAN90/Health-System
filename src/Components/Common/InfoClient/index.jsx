import { List, Box } from '@mui/material'
import React from 'react'

const InfoClient =({ name, list }) => {

   return (
        <div>
            <Box>
                {list.length === 0 ? `we do not have ${name}` :
                    <List>
                        {
                           list.map(service => {
                                const { wallet, addresContract, status } = service
                                return (
                                    <ul key={wallet}>
                                        <li> {wallet} </li>
                                        <li >{addresContract} </li>
                                        <li >  {status ? 'Active' : 'Inactive'}</li>
                                    </ul>
                                )
                            })
                        }
                    </List>
                }
            </Box>
        </div>
    )
}

export default InfoClient