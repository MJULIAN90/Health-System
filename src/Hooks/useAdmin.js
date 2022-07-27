import { useEffect, useState } from "react";
import { clearDataWallets } from "../utils";
import useAlerts from "./useAlerts";

const useAdmin = (props) => {
  const { alertMessage } = useAlerts();
  const { instanceContract, account } = props;
  const [balanceContract, setbalanceContract] = useState(0);
  const [listBasicServices, setListBasicServices] = useState([]);
  const [listSpecialServices, setListSpecialServices] = useState([]);
  const [listPendingClient, setlistPendingClient] = useState([]);
  const [listPendingLaboratory, setListPendingLaboratory] = useState([]);
  const [listClients, setlistClients] = useState([]);
  const [listLaboratories, setlistLaboratories] = useState([]);
  const [listServiceHistory, setListServiceHistory] = useState([]);
  const [listRenderFilter, setListRenderFilter] = useState([]);
  const [isSearching, setisSearching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getBalanceContract();
  }, [account]);

  const getBalanceContract = async () => {
    try {
      let getBalanceTocken = await instanceContract
        .balanceContractTokens()
        .call();
      setbalanceContract(getBalanceTocken);
    } catch (error) {
      alertMessage("Error balance");
    }
  };

  const getRechargeTokens = async (amount) => {
    try {
      await instanceContract
        .rechargeTokens(parseInt(amount))
        .send({ from: account[0] });
      getBalanceContract();
      alertMessage(`Tockens recharge ${amount}`, "success");
    } catch (error) {
      alertMessage();
    }
  };

  const getBasicServices = async () => {
    try {
      const response = await instanceContract.showListServices().call();
      const responseDetails = await Promise.all(
        response.map(
          async (name) => await instanceContract.showServiceDetails(name).call()
        )
      );
      setListBasicServices(responseDetails);
    } catch (error) {
      alertMessage();
    }
  };

  const onChangeStatusService = async (name) => {
    try {
      await instanceContract
        .changeStatusService(name)
        .send({ from: account[0] });

      alertMessage(
        "The service status has been successfully changed",
        "success"
      );
      getBasicServices();
    } catch (error) {
      alertMessage();
    }
  };

  const getCreateService = async (price, name) => {
    try {
      await instanceContract
        .createService(name, price)
        .send({ from: account[0] });

      alertMessage("A new service has been created", "success");
      getBasicServices();
    } catch (error) {
      alertMessage("Error creating a service");
    }
  };

  const getSpecialServices = async () => {
    try {
      const response = await instanceContract.showListServiceSpecial().call();
      const responseSpecialDetails = await Promise.all(
        response.map(
          async (name) =>
            await instanceContract.showSpecialServiceDetails(name).call()
        )
      );
      setListSpecialServices(responseSpecialDetails);
    } catch (error) {
      alertMessage("Error loading services");
    }
  };

  const getPendintRequest = async (name) => {
    try {
      const response = await instanceContract
        .showPendingRequest(name)
        .call({ from: account[0] });
      if (name === "Client" && response.length > 0) {
        setlistPendingClient(clearDataWallets(response));
      } else {
        if (response.length > 0) {
          setListPendingLaboratory(clearDataWallets(response));
        }
      }
    } catch (error) {
      if (error.message.includes("Cannot read properties of undefined")) {
        return name === "Client"
          ? setlistPendingClient([])
          : setListPendingLaboratory([]);
      }
      alertMessage("Error", "error");
    }
  };

  const getEnableSubscription = async (add) => {
    try {
      await instanceContract.enableSubscription(add).send({ from: account[0] });

      alertMessage("A subscription has been enabled", "success");
      getPendintRequest("Client");
      getPendintRequest("Laboratory");
    } catch (error) {
      alertMessage("A subscription has't been enabled");
    }
  };

  const getClients = async () => {
    try {
      let listUsers = await instanceContract
        .showListUsers()
        .call({ from: account[0] });
      const array = [];
      await Promise.all(
        listUsers.map(async (client) => {
          const response = await instanceContract
            .showDetailsUser(client)
            .call();
          if (response[0] === "0" && response[1] === true) {
            const balance = await instanceContract
              .balanceContractUser(response[2])
              .call();

            return array.push({
              wallet: client,
              status: response[1],
              addresContract: response[2],
              statusContract: response[3],
              BalanceUser: balance,
            });
          }
        })
      );
      setlistClients(array);
    } catch (error) {
      alertMessage();
    }
  };

  const getLaboratories = async () => {
    try {
      let listUsers = await instanceContract
        .showListUsers()
        .call({ from: account[0] });
      const data = [];
      await Promise.all(
        listUsers.map(async (client) => {
          const response = await instanceContract
            .showDetailsUser(client)
            .call();
          if (response[0] === "1" && response[1] === true) {
            const balance = await instanceContract
              .balanceContractUser(response[2])
              .call();

            return data.push({
              wallet: client,
              status: response[1],
              addresContract: response[2],
              statusContract: response[3],
              BalanceUser: balance,
            });
          }
        })
      );
      setlistLaboratories(data);
    } catch (error) {
      alertMessage();
    }
  };

  const onBanUser = async (add) => {
    try {
      await instanceContract.bannedUser(add).send({ from: account[0] });
      alertMessage("Contract user has been banned", "success");
      getClients();
      getLaboratories();
    } catch (error) {
      alertMessage("Error in transaction");
    }
  };

  const onUnBanUser = async (add) => {
    try {
      await instanceContract.unBannedUser(add).send({ from: account[0] });
      alertMessage("Contract user has been actived", "success");
      getClients();
      getLaboratories();
    } catch (error) {
      alertMessage("Error in transaction");
    }
  };

  const getHistoryTransaction = async () => {
    let arrayData = [];

    try {
      const counter = await instanceContract.counterServices().call();
      if (counter > 0) {
        for (let i = 0; i < counter; i++) {
          const response = await instanceContract
            .showDetailServiceUsed(i)
            .call();
          arrayData.push(response);
        }

        setListServiceHistory(arrayData);
      }
    } catch (error) {
      alertMessage();
    }
  };

  return {
    setData,
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
    getHistoryTransaction,
    setListRenderFilter,
    setisSearching,
    balanceContract,
    listBasicServices,
    listSpecialServices,
    listPendingLaboratory,
    listPendingClient,
    listClients,
    listLaboratories,
    listServiceHistory,
    listRenderFilter,
    isSearching,
    data,
  };
};

export default useAdmin;
