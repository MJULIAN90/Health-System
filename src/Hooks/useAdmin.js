import { useEffect, useState } from "react"
import { clearDataWallets } from "../utils"
import useAlerts from "./useAlerts"

const useAdmin = (props) => {
    const { alertMessage } = useAlerts()
    const { instanceContract, account } = props
    const [balanceContract, setbalanceContract] = useState(0);
    const [listBasicServices, setListBasicServices] = useState([]);
    const [listSpecialServices, setListSpecialServices] = useState([]);
    const [listPendingClient, setlistPendingClient] = useState([]);
    const [listPendingLaboratory, setListPendingLaboratory] = useState([]);
    const [listClients, setlistClients] = useState([]);
    const [listLaboratories, setlistLaboratories] = useState([]);

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

    const getRechargeTokens = async (amount) => {
        try {
             await instanceContract.rechargeTokens(parseInt(amount)).send({ from: account[0] });
            // const messageResponse = response.events.rechargeTokensEvent.returnValues[0];
            getBalanceContract ()
            alertMessage(`Tockens recharge ${amount}`, 'success');
        } catch (error) {
            alertMessage();
        }
    }

    const getBasicServices = async () => {
        try {
            const response = await instanceContract.showListServices().call();
            const responseDetails = await Promise.all(response.map(async (name) => await instanceContract.showServiceDetails(name).call()));
            setListBasicServices(responseDetails);
        } catch (error) {
            alertMessage();
        }
    }

    const onChangeStatusService = async (name) => {
        try {
            /* const response = */ await instanceContract.changeStatusService(name).send({ from: account[0] });
            // const messageResponse = response.events.changeStatusServiceEvent.returnValues[0];

            alertMessage('The service status has been successfully changed', 'success');
            getBasicServices();
            // return response;
        } catch (error) {
            alertMessage();
        }
    }

    const getCreateService = async (price, name) => {
        try {
            /* const response =  */await instanceContract.createService(name, price).send({ from: account[0] });
            // const messageResponse = response.events.messageEvent.returnValues[0];
            alertMessage('A new service has been created', 'success');
            getBasicServices()
        } catch (error) {
            alertMessage('Error creating a service');
        }
    }

    const getSpecialServices = async () => {
        try {
            const response = instanceContract.showListServiceSpecial().call()
            const responseSpecialDetails = await Promise.all(response.map(async (name) => await instanceContract.showSpecialServiceDetails(name).call()));
            setListSpecialServices(responseSpecialDetails);
        } catch (error) {
            alertMessage('Error loading services');
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
            /* const response = */await  instanceContract.enableSubscription(add).send({ from: account[0] });
            // const messageResponse = response.events.messageEvent.returnValues[0];
            // alertMessage(messageResponse, 'success');
            alertMessage('A subscription has been enabled', 'success');
            getPendintRequest('Client');
            getPendintRequest('Laboratory');
        } catch (error) {
            alertMessage("A subscription has't been enabled");
        }
    }

    const getClients = async () => {
        try {
            let listUsers = await instanceContract.showListUsers().call({ from: account[0] })
            const array = []
            await Promise.all(listUsers.map(async client => {
                const response = await instanceContract.showDetailsUser(client).call()
                if (response[0] === '0' && response[1] === true) {
                    return array.push({
                        wallet: client,
                        status: response[1],
                        addresContract: response[2],
                        statusContract: response[3]
                    })
                }
            }))
            setlistClients(array)
        } catch (error) {
            alertMessage()
        }
    }

    const getLaboratories = async () => {
        try {
            let listUsers = await instanceContract.showListUsers().call({ from: account[0] })
            const data = []
            await Promise.all(listUsers.map(async client => {
                const response = await instanceContract.showDetailsUser(client).call()
                if (response[0] === '1' && response[1] === true) {
                    return data.push({
                        wallet: client,
                        status: response[1],
                        addresContract: response[2]
                    })
                }
            }))
            setlistLaboratories(data)
        } catch (error) {
            alertMessage()
        }
    }

    const onBanUser = async (add) => {
        try {
            await instanceContract.bannedUser(add).send({ from: account[0] });
            alertMessage('Contract user has been banned', 'success');
            getClients()
        } catch (error) {
            alertMessage("Error in transaction");
        }
     }

    const onUnBanUser = async (add) => {
        try {
            await instanceContract.unBannedUser(add).send({ from: account[0] });
            alertMessage('Contract user has been actived', 'success');
            getClients()
        } catch (error) {
            alertMessage("Error in transaction");
        }
     }

    return {
        onBanUser,
        onUnBanUser,
        getPendintRequest,
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
    }
}

export default useAdmin;