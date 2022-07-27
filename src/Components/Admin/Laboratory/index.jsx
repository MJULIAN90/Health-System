import React, { useEffect } from "react";
import { InfoClient } from "../../Common";

const Laboratory = (props) => {
  const { listLaboratories, getLaboratories, setisSearching } = props;

  useEffect(() => {
    getLaboratories();
    setisSearching(false);
  }, []);

  return <InfoClient name={"Laboratory"} list={listLaboratories} {...props} />;
};

export default Laboratory;
