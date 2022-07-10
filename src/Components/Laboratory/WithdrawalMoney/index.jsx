import { Button } from "@mui/material";
import React from "react";
import { Form } from "../../Common";

const WithdrawalMoney = ({ withdrawalMoney }) => {
  return (
    <Form method={withdrawalMoney} textButton="Witdrawal"/>
  );
};

export default WithdrawalMoney;