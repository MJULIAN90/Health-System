import { useEffect, useState } from 'react'

import initWeb3 from '../config/initContrat'

const useInit = ()=>{

    const [instanceContract, setInstanceContract ] = useState(false);
    const [ account, setAccount ] = useState([]);
    const [useWeb3, setUseWeb3] = useState(undefined)
    const [roleUser, setRoleUser] = useState({
        role: undefined,
        status:false
    })

    useEffect(() => {
        window.ethereum.on("accountsChanged", () => {
            window.location.reload();
        })
    }, [])
    
    useEffect(() => {
        initContrat ()
    }, [])

   
    useEffect(() => {
        getRole()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instanceContract, account])
       
   
    const initContrat = async () => {
        const { instance: { methods }, accounts, web3 } = await initWeb3 ();
        setInstanceContract( methods );
        setAccount( accounts );
        setUseWeb3(web3)
    }
    
    // Role user
    const getRole = async () => {
        if (instanceContract){
            const owner = await instanceContract.owner().call()
            if (owner !== account[0]) {
                let responseRole = await instanceContract.showStatusAndRole().call()
                setRoleUser({
                    role: responseRole[0] === '0' ? 'CLient' : 'Laboratory',
                    status: responseRole[1]
                })
            } else {
                setRoleUser({
                    role: 'Admin',
                    status: true
                })
            }
        }
    }

    const getNewUser = async () =>{
        let signer = await useWeb3.eth.getAccounts()
        const response = await instanceContract.requestSubscriptionClient().send({ from: signer[0] })
        console.log('responses laboratyr', response);
    }

    const getNewLaboratory = async () => {
        let signer = await useWeb3.eth.getAccounts()
        const response = await instanceContract.requestSubscriptionLaboratory().send({ from: signer[0] })
        console.log('responses laboratyr', response);
    }

    //Web3
    const getBalanceEth = async () => {
        let getBalanceTocken = await instanceContract.balanceContractUser(account[0]).call()
        console.log('getBalanceTocken', getBalanceTocken);
    }


    return{
        instanceContract,
        account,
        useWeb3,
        roleUser,
        getRole,
        getNewUser,
        getNewLaboratory,
        getBalanceEth
    }
}

export default useInit;