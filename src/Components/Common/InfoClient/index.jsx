import { List, Box, Button } from '@mui/material'
import React from 'react'
import { handleStatusContract } from '../../../utils'

const InfoClient = ({ name, list, unBanUser, banUser }) => {

    const nullContract = '0x0000000000000000000000000000000000000000'
 
   return (
        <div>
            <Box>
                {list.length === 0 ? `we do not have ${name}` :
                    <List>
                        {
                           list.map(service => {
                               const { wallet, addresContract, status, statusContract, BalanceUser } = service

                                return (
                                    <>
                                        <ul key={wallet}>
                                            <li> Address: {wallet} </li>
                                            <li > {addresContract !== nullContract ? `Number contract: ${addresContract.toUpperCase() }` : 'Number contract: NO AVAILABLE'} </li>
                                            <li > Account status:  {status ? 'ACTIVE' : 'INACTIVE'}</li>
                                            <li>  Status contract: {statusContract.toUpperCase()}</li>
                                            <li>  Balance contract: {BalanceUser} tockens</li>
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