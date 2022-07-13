const accountNone = '0x0000000000000000000000000000000000000000'

export const clearDataWallets = (listWallets) => {
    return listWallets.filter(acc => acc !== accountNone)
}

export const isContractValid = (numberContract, setnumberContract) => {

    if (numberContract !== accountNone){
        setnumberContract(numberContract)
        return false
    }
    return true
}

export const hamdleStatusContract = (status, name) => {
    if (name === 'active') {
        if (status === 'active' || status === 'banned' || status === 'acepted') return true
    }

    if (name === 'unblock') {
        if (status === 'active' || status === 'inactive' || status === 'acepted') return true
    }

    if (name === 'block') {
        if (status === 'banned' || status === 'inactive') return true
    }
}
