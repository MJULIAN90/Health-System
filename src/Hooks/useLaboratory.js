import { useEffect, useState } from "react";
import { isContractValid, accountNone } from "../utils";
import useAlerts from "./useAlerts";
import SimpleStorageContract from "../contracts/Laboratory.json";
import { useNavigate } from "react-router-dom";

const useLaboratory = (props) => {
  const { alertMessage } = useAlerts();
  const navigate = useNavigate();
  const { instanceContract, account, useWeb3 } = props;
  const [specialServiceList, setSpecialServiceList] = useState([]);
  const [numberContract, setnumberContract] = useState(0);
  const [statusContractClient, setStatusContractClient] = useState(false);
  const [instanceContractLaboratory, setInstanceContractLaboratory] =
    useState(false);
  const [balanceLaboratory, setbalanceLaboratory] = useState(0);
  const [listServiceHistory, setListServiceHistory] = useState([]);
  const [listRenderFilter, setListRenderFilter] = useState([]);
  const [isSearching, setisSearching] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getCheckNumberContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    numberContract !== 0 && getBalanceLaboratory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActiveContract = async () => {
    try {
      const response = await instanceContract
        .createLaboratoryFactory()
        .send({ from: account[0] });
      const messageResponse = response.events.createFactoryEvent.returnValues;
      getCheckNumberContract();

      alertMessage(`${messageResponse[0]} # ${messageResponse[1]}`, "success");
    } catch (error) {
      alertMessage("Error loading your contract");
    }
  };

  const getCheckNumberContract = async () => {
    try {
      let numberContract = await instanceContract
        .checkNumberContract()
        .call({ from: account[0] });

      if (accountNone === numberContract) {
        alertMessage("You will need to sign your contract", "info");
        await getActiveContract();
      }

      setStatusContractClient(
        isContractValid(numberContract, setnumberContract)
      );
      const instance = await new useWeb3.eth.Contract(
        SimpleStorageContract.abi,
        numberContract
      );

      setInstanceContractLaboratory(instance.methods);
    } catch (error) {
      alertMessage();
    }
  };

  const getBalanceLaboratory = async () => {
    try {
      let response = await instanceContractLaboratory
        .balanceLaboratory()
        .call();

      setbalanceLaboratory(response);
    } catch (error) {
      alertMessage();
    }
  };

  const cancelContract = async () => {
    try {
      await instanceContractLaboratory
        .cancelContractLaboratory()
        .send({ from: account[0] });
      alertMessage("Contract canceled", "success");

      navigate("/");
    } catch (error) {
      alertMessage("Error in transaction");
    }
  };

  const withdrawalMoney = async (quantity) => {
    try {
      if (balanceLaboratory < quantity) {
        return alertMessage("Error in transaction insufficient balance");
      }
      await instanceContractLaboratory
        .withdrawBalanceLaboratory(quantity)
        .send({ from: account[0] });

      alertMessage(`successful retirement by ${quantity} tockens `, "success");
      getBalanceLaboratory();
    } catch (error) {
      alertMessage("Error in transaction insufficient balance");
    }
  };

  const getSpecialServices = async () => {
    try {
      const response = await instanceContractLaboratory
        .listSpecialServices()
        .call();
      const responseDetails = await Promise.all(
        response.map(
          async (name) =>
            name !== "" &&
            (await instanceContractLaboratory
              .detailsSpecialService(name)
              .call())
        )
      );
      const data = responseDetails.filter((item) => item !== false);

      setSpecialServiceList(data);
    } catch (error) {
      alertMessage("Error loading list services");
    }
  };

  const onChangeStatusSpecialService = async (name) => {
    try {
      await instanceContractLaboratory
        .changeStatusServiceLaboratory(name)
        .send({ from: account[0] });
      getSpecialServices();

      alertMessage(
        "The service status has been successfully changed",
        "success"
      );
    } catch (error) {
      alertMessage();
    }
  };

  const getCreateSpecialService = async (price, name) => {
    try {
      await instanceContractLaboratory
        .createSpecialService(name, price)
        .send({ from: account[0] });
      getSpecialServices();

      alertMessage("A new service has been created", "success");
    } catch (error) {
      alertMessage("Error creating a service");
    }
  };

  const getUsersHistory = async () => {
    let arrayData = [];

    try {
      const counter = await instanceContract.counterServices().call();
      if (counter > 0) {
        for (let i = 0; i < counter; i++) {
          const response = await instanceContract
            .showDetailServiceUsed(i)
            .call();
          if (response[0] === numberContract) {
            arrayData.push(response);
          }
        }

        setListServiceHistory(arrayData);
      }
    } catch (error) {
      alertMessage();
    }
  };

  return {
    cancelContract,
    withdrawalMoney,
    getSpecialServices,
    onChangeStatusSpecialService,
    getCreateSpecialService,
    getUsersHistory,
    setListRenderFilter,
    setisSearching,
    setData,
    specialServiceList,
    numberContract,
    balanceLaboratory,
    statusContractClient,
    listServiceHistory,
    listRenderFilter,
    isSearching,
    data,
  };
};

export default useLaboratory;
