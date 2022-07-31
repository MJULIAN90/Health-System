import React from "react";
import { ContainerCard } from "../../Common";

const BuyTokens = ({ buyTokens, statusContractClient }) => {
  return (
    <ContainerCard
      action={buyTokens}
      title={"Buy Tokens"}
      status={statusContractClient}
    />
  );
};

export default BuyTokens;
