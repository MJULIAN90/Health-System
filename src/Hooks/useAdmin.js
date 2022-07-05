import { useCallback, useEffect, useMemo, useState } from "react"
import { clearDataWallets } from "../utils"
import useAlerts from "./useAlerts"

const useAdmin = (props) => {
    const { alertMessage } = useAlerts()
    const { instanceContract, account, useWeb3 } = props
    const [balanceContract, setbalanceContract] = useState(0);
    const [listBasicServices, setListBasicServices] = useState([]);
    const [listSpecialServices, setListSpecialServices] = useState([]);
    const [listPendingClient, setlistPendingClient] = useState([]);
    const [listPendingLaboratory, setListPendingLaboratory] = useState([]);
    const [listClients, setlistClients] = useState([]);
    const [listLaboratories, setlistLaboratories] = useState([]);
    const [valuesClients, setValuesClients] = useState([])
    const [valuesLaboratories, setValuesLaboratories] = useState([])


    useEffect(() => {
        getBalanceContract();
    }, [account])

    const getBalanceContract = async () => {
        try {
            let getBalanceTocken = await instanceContract.balanceContractTokens().call();
            setbalanceContract(getBalanceTocken);
        } catch (error) {
            alertMessage();
        }
    }

    // Pendiente component andres
    const getRechargeTokens = async (amount) => {
        let getBalanceTocken = await instanceContract.rechargeTokens(amount).call({ from: account[0] });

    }

    const getBasicServices = async () => {
        try {
            const response = await instanceContract.showListServices().call();
            const responseDetails = await Promise.all(response.map(async (name) => await instanceContract.showServiceDetails(name).call()));
            setListBasicServices(responseDetails);
        } catch (error) {
            console.log('getBasicServices error', error);
            alertMessage();
        }
    }

    const onChangeStatusService = async (name) => {
        try {
            const response = await instanceContract.changeStatusService(name).send({ from: account[0] });
            const messageResponse = response.events.changeStatusServiceEvent.returnValues[0];

            alertMessage(messageResponse, 'success');
            getBasicServices();
            return response;
        } catch (error) {
            console.log('onChangeStatusService error', error);
            alertMessage();
        }
    }

    const getCreateService = async (price, name) => {
        try {
            const response = await instanceContract.createService(name, price).send({ from: account[0] });
            const messageResponse = response.events.createServiceEvent.returnValues[0];

            alertMessage(messageResponse, 'success');
            getBasicServices()
        } catch (error) {
            console.log('error getCreateService', error);
            alertMessage();
        }
    }

    const getSpecialServices = async () => {
        try {
            const response = instanceContract.showListServiceSpecial().call()
            const responseSpecialDetails = await Promise.all(response.map(async (name) => await instanceContract.showSpecialServiceDetails(name).call()));
            console.log('responseSpecialDetails', responseSpecialDetails);
            setListSpecialServices(responseSpecialDetails);
        } catch (error) {
            alertMessage();
        }
    }
    const getPendintRequest = async (name) => {
        try {
            const response = await instanceContract.showPendingRequest(name).call({ from: account[0] });
            if (name === 'Client' && response.length > 0) {
                setlistPendingClient(clearDataWallets(response));
            }
            else {
                if (response.length > 0) {
                    setListPendingLaboratory(clearDataWallets(response));
                }
            }
        } catch (error) {
            if (error.message.includes("Cannot read properties of undefined")) {
                return name === 'Client' ? setlistPendingClient([]) : setListPendingLaboratory([]);
            }
            alertMessage('Error', 'error');
        }
    }

    const getEnableSubscription = async (add) => {
        try {
            const response = await instanceContract.enableSubscription(add).send({ from: account[0] });
            const messageResponse = response.events.enableSubscriptionEvent.returnValues[0];
            console.log('getEnableSubscription', response.events.enableSubscriptionEvent.returnValues[0]);
            alertMessage(messageResponse, 'success');
            getPendintRequest();

        } catch (error) {
            console.log('getEnableSubscription error', error);

            alertMessage();
        }
    }

    // ver si fuciona
    const onCancelContractCliente = (add) => { }

    // ver si fuciona
    const onCancelContractLaboratory = (add) => { }

    // ! pendiente por hacer o si funciona
    const cancelContract = () => {
        // ? aun no tenemos que el admin cancele contratos
        // ? revisar como se queman los contratos
        // const response = instanceContract.
    }

    const getClients = async () => {
        try {
            let listUsers = await instanceContract.showListUsers().call({ from: account[0] })
            setValuesClients(listUsers)
            if (listUsers.length > 0 && valuesClients.length !== listUsers.length) {
                await Promise.all(listUsers.filter(async client => {
                    const response = await instanceContract.showDetailsUser(client).call()
                    if (response[0] === '0') {
                        setlistClients(
                            ...listClients,
                            [{
                                wallet: client,
                                status: response[1],
                                addresContract: response[2]
                            }]
                        )
                    }
                }))
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const getLaboratories = async () => {
        try {
            let listUsers = await instanceContract.showListUsers().call({ from: account[0] })
            setValuesLaboratories(listUsers)
            if (listUsers.length > 0 && valuesLaboratories.length !== listUsers.length) {
                await Promise.all(listUsers.filter(async client => {
                    const response = await instanceContract.showDetailsUser(client).call()
                    if (response[0] === '1') {
                        setlistLaboratories(
                            ...listLaboratories,
                            [{
                                wallet: client,
                                status: response[1],
                                addresContract: response[2]
                            }]
                        )
                    }
                }))
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    return {
        getPendintRequest,
        cancelContract,
        getClients,
        getLaboratories,
        getSpecialServices,
        getEnableSubscription,
        getBasicServices,
        onChangeStatusService,
        getCreateService,
        getRechargeTokens,
        balanceContract,
        listBasicServices,
        listSpecialServices,
        listPendingLaboratory,
        listPendingClient,
        listClients,
        listLaboratories,
        first: valuesClients
    }

}

export default useAdmin;