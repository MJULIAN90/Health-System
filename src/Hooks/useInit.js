import { useEffect, useState } from "react";
import initWeb3 from "../config/initContrat";
import useAlerts from "./useAlerts";

const useInit = () => {
  const { alertMessage } = useAlerts();
  const [instanceContract, setInstanceContract] = useState(false);
  const [account, setAccount] = useState([]);
  const [useWeb3, setUseWeb3] = useState(undefined);
  const [roleUser, setRoleUser] = useState({
    role: undefined,
    status: false,
  });
  const [balanceEthers, setBalanceEthers] = useState(0);
  const [balanceEthersContract, setBalanceEthersContract] = useState(0);

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    initContrat();
  }, []);

  useEffect(() => {
    getRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instanceContract, account]);

  useEffect(() => {
    getBalanceEth();
    useWeb3 && getBalanceContractEthers();
  }, [account, useWeb3]);

  const initContrat = async () => {
    const {
      instance: { methods },
      accounts,
      web3,
    } = await initWeb3();
    setInstanceContract(methods);
    setAccount(accounts);
    setUseWeb3(web3);
  };

  const getRole = async () => {
    if (instanceContract) {
      const owner = await instanceContract.owner().call();
      if (owner !== account[0]) {
        let responseRole = await instanceContract
          .showStatusAndRole()
          .call({ from: account[0] });

        setRoleUser({
          role: responseRole[0] === "0" ? "Client" : "Laboratory",
          status: responseRole[1],
          statusContract: responseRole[3],
        });
      } else {
        setRoleUser({
          role: "Admin",
          status: true,
        });
      }
    }
  };

  const getBalanceEth = async () => {
    try {
      if (useWeb3 && account) {
        let balance = await useWeb3.eth.getBalance(account[0]);
        setBalanceEthers(balance);
      }
    } catch (error) {
      alert();
    }
  };

  const getNewUser = async () => {
    try {
      if (roleUser.statusContract === "") {
        await instanceContract
          .requestSubscriptionClient()
          .send({ from: account[0] });
        alertMessage("Successful request", "success");
        getRole();
      } else {
        return alertMessage("you have a subscription", "info");
      }
    } catch (error) {
      alertMessage("Error in your request");
    }
  };

  const getBalanceContractEthers = async () => {
    try {
      const response = await instanceContract.BalanceContractEthers().call();
      setBalanceEthersContract(response / 1000000000);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewLaboratory = async () => {
    try {
      if (roleUser.statusContract === "") {
        await instanceContract
          .requestSubscriptionLaboratory()
          .send({ from: account[0] });

        alertMessage("Successful request", "success");
        getRole();
      } else {
        return alertMessage("you have a subscription", "info");
      }
    } catch (error) {
      alertMessage("Error in your request");
    }
  };

  const onSumit = (navigate) => {
    if (roleUser.statusContract !== "") {
      if (roleUser.statusContract === "banned")
        return alertMessage("You account has been baneed", "info");
      else if (roleUser.statusContract === "inactive")
        return alertMessage("You contract has been disabled", "info");
      else if (roleUser.statusContract === "initial")
        return alertMessage(
          "You have to wait for your account activation",
          "info"
        );
      else return navigate("/home");
    }
    return alertMessage("you need a subscription", "error");
  };

  return {
    instanceContract,
    account,
    useWeb3,
    roleUser,
    balanceEthers,
    balanceEthersContract,
    getRole,
    getNewUser,
    getNewLaboratory,
    onSumit,
  };
};

export default useInit;
