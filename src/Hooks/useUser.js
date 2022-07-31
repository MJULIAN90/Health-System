import { useEffect, useState } from "react";
import useAlerts from "./useAlerts";
import SimpleStorageContract from "../contracts/Client.json";
import { isContractValid } from "../utils";
import { useNavigate } from "react-router-dom";

const useUser = (props) => {
  const navigate = useNavigate();
  const { instanceContract, account, useWeb3, getRole } = props;
  const { alertMessage } = useAlerts();
  const [instanceContractClient, setInstanceContractClient] = useState(false);
  const [statusContractClient, setStatusContractClient] = useState(false);
  const [listSpecialService, setListSpecialService] = useState([]);
  const [listBasicService, setListBasicService] = useState([]);
  const [listServiceHistory, setListServiceHistory] = useState([]);
  const [numberContract, setnumberContract] = useState(0);
  const [balanceClient, setbalanceClient] = useState(0);
  const [listRenderFilter, setListRenderFilter] = useState([]);
  const [isSearching, setisSearching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getCheckNumberContract();
  }, []);

  useEffect(() => {
    numberContract !== 0 && getBalanceClient();
  }, [numberContract]);

  const getCheckNumberContract = async () => {
    try {
      let numberContract = await instanceContract
        .checkNumberContract()
        .call({ from: account[0] });
      setStatusContractClient(
        isContractValid(numberContract, setnumberContract)
      );
      const instance = await new useWeb3.eth.Contract(
        SimpleStorageContract.abi,
        numberContract
      );

      setInstanceContractClient(instance.methods);
    } catch (error) {
      alertMessage();
    }
  };

  const getActiveContract = async () => {
    try {
      const response = await instanceContract
        .createClientFactory()
        .send({ from: account[0] });
      const messageResponse = response.events.createFactoryEvent.returnValues;
      getCheckNumberContract();
      getRole();
      alertMessage(`${messageResponse[0]} # ${messageResponse[1]}`, "success");
    } catch (error) {
      alertMessage("Error creating your contract");
    }
  };

  const getBalanceClient = async () => {
    try {
      let response = await instanceContractClient.balanceUser().call();
      setbalanceClient(response.slice(0, 6));
    } catch (error) {
      alertMessage();
    }
  };

  const buyTokens = async (quantity) => {
    try {
      await instanceContractClient.buyTokens(quantity).send({
        from: account[0],
        value: await useWeb3.utils.toWei(quantity, "ether"),
      });
      getBalanceClient();

      alertMessage("Tockens recharged", "success");
    } catch (error) {
      alertMessage("Insufficient balance");
    }
  };

  const getListBasicServices = async () => {
    if (numberContract !== 0) {
      try {
        const response = await instanceContractClient.listServices().call();
        let data = await response.filter((name) => name != "");
        const responseDetails = await Promise.all(
          data.map(
            async (name) =>
              await instanceContractClient.detailsService(name).call()
          )
        );

        setListBasicService(responseDetails);
      } catch (error) {
        alertMessage();
      }
    } else {
      alertMessage("You don't have a contract active", "info");
    }
  };

  const getListSpecialServices = async () => {
    if (numberContract !== 0) {
      try {
        const response = await instanceContractClient
          .listSpecialServices()
          .call();
        let data = await response.filter((name) => name != "");

        const responseSpecialDetails = await Promise.all(
          data.map(
            async (name) =>
              await instanceContractClient.detailsSpecialService(name).call()
          )
        );

        setListSpecialService(responseSpecialDetails);
      } catch (error) {
        alertMessage();
      }
    } else {
      alertMessage("You don't have a contract active", "info");
    }
  };

  const getServiceHistory = async () => {
    let arrayData = [];

    if (numberContract !== 0) {
      try {
        const counter = await instanceContract.counterServices().call();

        if (counter > 0) {
          for (let i = 0; i < counter; i++) {
            const response = await instanceContract
              .showDetailServiceUsed(i)
              .call();

            if (response[1] === numberContract) {
              arrayData.push(response);
            }
          }

          setListServiceHistory(arrayData);
        }
      } catch (error) {
        alertMessage();
      }
    } else {
      alertMessage("You don't have a contract active", "info");
    }
  };

  const cancelContract = async () => {
    try {
      await instanceContractClient.cancelContract().send({ from: account[0] });
      alertMessage("Contract canceled", "success");

      navigate("/");
    } catch (error) {
      alertMessage();
    }
  };

  const getUseBasicService = async (nameService, price) => {
    console.log("name service", nameService);
    if (Number(price) > Number(balanceClient)) {
      return alertMessage("Insufficient balance", "info");
    }

    try {
      await instanceContractClient
        .useService(nameService)
        .send({ from: account[0] });
      getListBasicServices();
      getBalanceClient();

      alertMessage(`Service ${nameService} purchased`, "success");
    } catch (error) {
      alertMessage(
        "Error in the transaction check your balance or internet connection"
      );
    }
  };

  const getUseSpecialService = async (nameService, price) => {
    if (Number(price) > Number(balanceClient))
      return alertMessage("Insufficient balance", "info");

    try {
      await instanceContractClient
        .useSpecialService(nameService)
        .send({ from: account[0] });
      getBalanceClient();
      getListSpecialServices();
      getBalanceClient();

      alertMessage("Service actived", "success");
    } catch (error) {
      alertMessage(
        "Error in the transaction check your balance or internet connection"
      );
    }
  };

  return {
    buyTokens,
    getListBasicServices,
    getListSpecialServices,
    getServiceHistory,
    cancelContract,
    getActiveContract,
    getUseBasicService,
    getUseSpecialService,
    setListRenderFilter,
    setisSearching,
    setData,
    listSpecialService,
    listBasicService,
    listServiceHistory,
    instanceContractClient,
    statusContractClient,
    numberContract,
    balanceClient,
    listRenderFilter,
    isSearching,
    data,
  };
};

export default useUser;
