import React, { useEffect } from 'react'
import { InfoClient } from '../../Common'

const Laboratory = ({ listLaboratories, getLaboratories }) => {

    useEffect(() => {
        getLaboratories()
    }, [])
    
    return (
        <InfoClient name={'Laboratory'} list={listLaboratories} />
    )
}

export default Laboratory