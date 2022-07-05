const accountNone = '0x0000000000000000000000000000000000000000'

export const clearDataWallets = (listWallets) => {
    return listWallets.filter(acc => acc !== accountNone)
}