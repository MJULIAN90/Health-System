import React from "react";
import { Button, TextField, Container } from "@mui/material";
import {Form} from "../../Commons";

const BuyTokens = ({ buyTokens }) => {
  return (
    <Form method={buyTokens} textButton="Buy Tokens"/>
  );
};

export default BuyTokens;