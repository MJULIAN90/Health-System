import React, { useEffect } from "react";
import { InfoClient } from "../../Common";

const Client = (props) => {
  const { listClients, getClients, setisSearching } = props;

  useEffect(() => {
    getClients();
    setisSearching(false);
  }, []);

  return <InfoClient name={"Client"} list={listClients} {...props} />;
};

export default Client;
