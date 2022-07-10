import { useEffect, useState } from 'react'

import initWeb3 from '../config/initContrat'
import useAlerts from './useAlerts';

const useInit = ()=>{
    const { alertMessage } = useAlerts()
    const [instanceContract, setInstanceContract ] = useState(false);
    const [ account, setAccount ] = useState([]);
    const [useWeb3, setUseWeb3] = useState(undefined)
    const [roleUser, setRoleUser] = useState({
        role: undefined,
        status:false
    })
    const [balanceEthers, setBalanceEthers] = useState(0);


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
       
    useEffect(() => {
        getBalanceEth ()
    }, [account])
    
   
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
                let responseRole = await instanceContract.showStatusAndRole().call({ from: account [0]})
                setRoleUser({
                    role: responseRole[0] === '0' ? 'Client' : 'Laboratory',
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

    const getBalanceEth = async () => {
        try {
            if (useWeb3 && account){
                let balance = await useWeb3.eth.getBalance(account[0]);
                setBalanceEthers(balance);
            }
        } catch (error) {
            alert();
        }
    }

    const getNewUser = async () =>{
        let signer = await useWeb3.eth.getAccounts()
        const response = await instanceContract.requestSubscriptionClient().send({ from: signer[0] })
        const messageResponse = response.events.createFactoryEvent.returnValues[0];
        alertMessage (messageResponse, 'success');
    }

    const getNewLaboratory = async () => {
        let signer = await useWeb3.eth.getAccounts()
        const response = await instanceContract.requestSubscriptionLaboratory().send({ from: signer[0] })
        const messageResponse = response.events.createFactoryEvent.returnValues[0];
        alertMessage(messageResponse, 'success');
    }

    return{
        instanceContract,
        account,
        useWeb3,
        roleUser,
        balanceEthers,
        getRole,
        getNewUser,
        getNewLaboratory,
    }
}

export default useInit;