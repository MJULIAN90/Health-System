import React, { useMemo } from 'react'
import { memo } from 'react';
import { InfoClient } from '../../Common'

const Laboratory = memo(({ listLaboratories, getLaboratories }) => {

    useMemo(
        async () => {
            await getLaboratories()
    },[listLaboratories],)

    return (
        <InfoClient name={'Laboratory'} list={listLaboratories} />
    )
})

export default Laboratory