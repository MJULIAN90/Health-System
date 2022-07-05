import { useEffect, useState } from 'react';

const useUser = (props) => {
  const { instanceContract, account, useWeb3 } = props;
  const [listSpecialService, setListSpecialService] = useState([]);
  const [listBasicService, setListBasicService] = useState([]);
  const [listServiceHistory, setListServiceHistory] = useState([]);


  const buyTokens = (quantity) => {
    instanceContract.buyTokens(quantity, account[0]).send({value: quantity});
  }

  const getListBasicServices = () => {
    setListBasicService([{nombre:"andres"}]);
  }

  const getListSpecialServices = () => {
    setListSpecialService([{nombre:"Mamá"}]);
  }

  const getServiceHistory = () => {
    setListServiceHistory(["casasss", "perros"])
  }

  const cancelContract = () => {
    console.log("estamos enla cancelada del contrato");
  }

  return {
    buyTokens,
    getListBasicServices,
    getListSpecialServices,
    getServiceHistory,
    cancelContract,
    listSpecialService,
    listBasicService,
    listServiceHistory,
  };
}

export default useUser;