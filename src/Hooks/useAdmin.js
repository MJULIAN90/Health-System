import { useEffect, useState } from "react"

const useAdmin = (props)=>{
    const { instanceContract, account  } = props
    const [balanceContract, setbalanceContract] = useState(0)
    const [listBasicServices, setListBasicServices] = useState([])
    const [listSpecialServices, setListSpecialServices] = useState([])
    const [listPendingClient, setlistPendingClient] = useState([])
    const [listPendingLaboratory, setListPendingLaboratory] = useState([])

    useEffect(() => {
        getBalanceTockens ()
    }, [account])
    
    const getBalanceTockens = async () => {
        let getBalanceTocken = await instanceContract.balanceContractTokens().call()
        setbalanceContract(getBalanceTocken)
    }

    const getBasicServices = () => {
        const response = instanceContract.showActivedServices().call()
        setListBasicServices(response)
    }

    const getDetailsServices = (name) => { 
        const response = instanceContract.showServiceDetails().call()
        // ver aca como llega la data
        return response;
    }
    
    const onChangeStatusService = (name) => {
        const response = instanceContract.changeStatusService().call(name, {from : account[0]})
        // seria bueno una alert ya que devuelve un emit
        return response 
    }
    const getSpecialServices = () => {
        const response = instanceContract.showActivedSpecialServices().call()
        setListSpecialServices(response)
    }

    const getDetailsServicesSpecial = (name) => {
        const response = instanceContract.showSpecialServiceDetails().call()
        // ver como llega la data
        return response 
     }

    const getPendintRequest = async (name) => {
        try {
            const response = await instanceContract.showPendingRequest(name).call({from: account[0]})

            if (name === 'Client') {
                let data = response.filter(acc => acc !== '0x0000000000000000000000000000000000000000')
                setlistPendingClient(data)
            }
            else {
                let data = response.filter(acc => acc !== '0x0000000000000000000000000000000000000000')
                setListPendingLaboratory(data)
            }
        } catch (error) {
            //aca viene alarma
            console.log('error', error );
        }
    }

    const onEnableSuscription = (add) =>{

    }

    const getEnableSubscription = (add) => {
        const response = instanceContract.enableSubscription().send(add, { from: account[0] })
    }


    // ver si fuciona
    const onCancelContractCliente = (add) =>{}

    // ver si fuciona
    const onCancelContractLaboratory = (add) => {}

    // ! pendiente por hacer o si funciona
    const cancelContract = () => {
        // ? aun no tenemos que el admin cancele contratos
        // ? revisar como se queman los contratos
        // const response = instanceContract.
    }

    //! ver si funciona y como
    const getUserOrLaboratory = (name) => {
        // const response = instanceContract.
    }

    return {
        getPendintRequest,
        cancelContract,
        getUserOrLaboratory,
        getSpecialServices,
        getEnableSubscription,
        getBasicServices,
        onChangeStatusService,
        getDetailsServices,
        getDetailsServicesSpecial,
        onEnableSuscription,
        balanceContract,
        listBasicServices,
        listSpecialServices,
        listPendingLaboratory,
        listPendingClient
    }

}

export default useAdmin;