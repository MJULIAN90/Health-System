import { List, Box, Button } from '@mui/material'
import React from 'react'
import { handleStatusContract } from '../../../utils'

const InfoClient = ({ name, list, unBanUser, banUser }) => {

   return (
        <div>
            <Box>
                {list.length === 0 ? `we do not have ${name}` :
                    <List>
                        {
                           list.map(service => {
                               const { wallet, addresContract, status, statusContract } = service

                                return (
                                    <>
                                        <ul key={wallet}>
                                            <li> Address: {wallet} </li>
                                            <li > {addresContract ? `Number contract: ${addresContract}` : 'you do not have a contract number available'} </li>
                                            <li > Account status:  {status ? 'Active' : 'Inactive'}</li>
                                            <li>  Status contract: {statusContract}</li>
                                        </ul>
                                        <Button onClick={() => { banUser(wallet) }} disabled={handleStatusContract(statusContract, 'block')} > Block contract </Button>
                                        <Button onClick={() => { unBanUser(wallet) }} disabled={handleStatusContract(statusContract, 'unblock')} > Unblock contract </Button>
                                        <Button onClick={() => { unBanUser(wallet) }} disabled={handleStatusContract(statusContract, 'active')} > Active contract </Button>

                                    </>

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