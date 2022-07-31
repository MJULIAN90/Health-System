import React from "react";
import { ContainerCard } from "../../Common";

const WithdrawalMoney = ({ withdrawalMoney }) => {
  return <ContainerCard action={withdrawalMoney} title={"Witdrawal"} />;
};

export default WithdrawalMoney;
