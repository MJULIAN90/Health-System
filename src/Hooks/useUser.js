import { useEffect, useState } from 'react';
import useAlerts from "./useAlerts"
import SimpleStorageContract from "../contracts/Client.json"
import { isContractValid } from '../utils';

const useUser = (props) => {
  const { instanceContract, account, useWeb3 } = props;
  const { alertMessage } = useAlerts()
  const [instanceContractClient, setInstanceContractClient] = useState(false)
  const [statusContractClient, setStatusContractClient] = useState(false)
  const [listSpecialService, setListSpecialService] = useState([]);
  const [listBasicService, setListBasicService] = useState([]);
  const [listServiceHistory, setListServiceHistory] = useState([]);
  const [numberContract, setnumberContract] = useState(0)
  const [balanceClient, setbalanceClient] = useState(0)


  useEffect(() => {
    getCheckNumberContract()
  }, [])

  useEffect(() => {
    numberContract !== 0 && getBalanceClient()
  }, [numberContract])

  const getCheckNumberContract = async () => {
    try {
      let numberContract = await instanceContract.checkNumberContract().call({ from: account[0] });
      setStatusContractClient(isContractValid(numberContract, setnumberContract))
      const instance = await new useWeb3.eth.Contract(
        SimpleStorageContract.abi,
        numberContract
      );

      setInstanceContractClient(instance.methods)
    } catch (error) {
      alertMessage()
    }
  }

  const getActiveContract = async () => {

    try {
      let response = await instanceContract.createClientFactory().send({ from: account[0] });
      const messageResponse = response.events.rechargeTokensEvent.returnValues;

      alertMessage(`${messageResponse[0]} # ${messageResponse[1]}`, 'success');
      getCheckNumberContract()
    } catch (error) {

    }
  }

  const getBalanceClient = async () => {
    try {
      let response = await instanceContractClient.balanceUser().call();
      setbalanceClient(response)
    } catch (error) {
      alertMessage()
    }
  }

  const buyTokens = async (quantity) => {
    try {
      await instanceContractClient.buyTokens(quantity).send({ from: account[0], value: await useWeb3.utils.toWei(quantity, 'ether') });
      getBalanceClient()

      alertMessage('Tockes recharge', 'success')
    } catch (error) {
      alertMessage('Insufficient balance')
    }
  }

  const getListBasicServices = async () => {
    

    try {
      const response = await instanceContractClient.listServices().call();
      const responseDetails = await Promise.all(response.map(async (name) => await instanceContractClient.detailsService(name).call()));

      setListBasicService(responseDetails);
    } catch (error) {
      alertMessage ()
    }
  }

  const getListSpecialServices = async () => {
    try {
      const response = await instanceContractClient.listSpecialServices().call();
      const responseSpecialDetails = await Promise.all(response.map(async (name) => await instanceContractClient.detailsSpecialService(name).call()));

      setListSpecialService(responseSpecialDetails);
    } catch (error) {
      alertMessage()
    }
  }

  const getServiceHistory = async () => {
    try {
      const response = await instanceContractClient.historyServices().call();

      setListServiceHistory(response)
    } catch (error) {
      alertMessage()
    }
  }

  const cancelContract = async () => {
    try {
      await instanceContractClient.cancelContract().call();
      
      alertMessage('Contract canceled')
    } catch (error) {
      alertMessage()
    }
  }

  const getUseBasicService = async (nameService) => {
/*     useWeb3.eth.getBlock("latest", false, (error, result) => {
      console.log(result)
    }) */

    // console.log('instanceContractClient', instanceContractClient);

    // instanceContractClient.useService(nameService).estimateGas(function (error, gasAmount) {
    //   console.log(error);
    //   console.log(gasAmount);
    // });

    try {
      // await instanceContractClient.useService(nameService).send({ from: account[0] });
      console.log('uer', instanceContractClient );
      let a = await instanceContract.asignServiceClient(nameService).send({ from: account[0] });
      // console.log('aaa', a);
      

      alertMessage('Service actived', 'success')
    } catch (error) {
      console.log('err', error);
      alertMessage()
    }
  }

  const getUseSpecialService = async (nameService) => {
    try {
      await instanceContractClient.useSpecialService(nameService).call();

      //aca esperar lo de los event
      alertMessage('Service actived')
    } catch (error) {
      alertMessage()
    }
  }



  return {
    buyTokens,
    getListBasicServices,
    getListSpecialServices,
    getServiceHistory,
    cancelContract,
    getActiveContract,
    getUseBasicService,
    getUseSpecialService,
    listSpecialService,
    listBasicService,
    listServiceHistory,
    instanceContractClient,
    statusContractClient,
    numberContract,
    balanceClient
  };
}

export default useUser;