import React, { useEffect } from 'react'
import { InfoClient } from '../../Common'

const Laboratory = ({ listLaboratories, getLaboratories, onBanUser, onUnBanUser }) => {

    useEffect(() => {
        getLaboratories()
    }, [])
    
    return (
        <InfoClient name={'Laboratory'} list={listLaboratories} banUser={onBanUser} unBanUser={onUnBanUser} />
    )
}

export default Laboratory