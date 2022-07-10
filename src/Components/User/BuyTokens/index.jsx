import React from "react";
import { Button, TextField, Container } from "@mui/material";
import {Form} from "../../Common";

const BuyTokens = ({ buyTokens, statusContractClient }) => {
  return (
    <Form method={buyTokens} textButton="Buy Tokens" isDisable={statusContractClient}/>
  );
};

export default BuyTokens;