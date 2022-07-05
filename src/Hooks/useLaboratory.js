import { useEffect, useState } from 'react';

const useLaboratory = (props) => {
  const { instanceContract, account, useWeb3 } = props;
  const [serviceList, setServiceList] = useState([]);

  const cancelContract = () => {
    console.log("vamos con toda");
  }

  const withdrawalMoney = (quantity) => {
    console.log(quantity);
  }

  const services = () => {
    setServiceList(["casa", "especial"]);
  }

  return {
    cancelContract,
    withdrawalMoney,
    services,
    serviceList,
  };
}

export default useLaboratory;