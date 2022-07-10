import { Button, Typography } from '@mui/material'
import React from 'react'

const Service = ({ service, onPressChangeStatus, typeService = false, isBuyService = false, onBuyService }) => {

    const onchangeStatus = () => {
        onPressChangeStatus(service[0])
    }

    const handleBuyService = () => {
        onBuyService(service[0])
    }

    return (
        <>
            <Typography > {service[0]} </Typography>
            <Typography > {service[1]} </Typography>
            <Typography > {service[2] ? 'Activo' : 'Inactive'} </Typography>

            {
                typeService &&
                    <Button onClick={onchangeStatus} disabled={!service[2]}>
                        Desactivar
                    </Button>
            }

            {
                typeService &&
                    <Button onClick={onchangeStatus} disabled={service[2]}>
                        Activar
                    </Button>
            }
            
            {
                isBuyService &&
                <Button onClick={handleBuyService} >
                    Buy Service
                </Button>
            }
        </>
    )
}

export default Service