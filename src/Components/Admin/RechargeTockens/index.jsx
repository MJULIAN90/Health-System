import React from "react";
import { ContainerCard } from "../../Common";

const RechargeTockens = ({ getRechargeTokens }) => {
  return <ContainerCard action={getRechargeTokens} title={"Create tocken"} />;
};

export default RechargeTockens;
