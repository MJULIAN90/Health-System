import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import {
  BuyTokens,
  CancelContract,
  ServiceHistory,
  Services,
} from "../../../Components/User";

const Content = (props) => {
  const {
    setData,
    listBasicServices,
    listClients,
    setListRenderFilter,
    listLaboratories,
    listSpecialServices,
    listServiceHistory,
  } = props;
  const { scene } = props;
  useMemo(() => {
    // setListRenderFilter([]);
  }, [scene]);

  const renderScene = () => {
    switch (scene) {
      case "buy_tokens":
        return <BuyTokens {...props} />;

      case "services":
        // aca como h acemos si son dos
        // setData(listBasicServices);
        return <Services {...props} />;

      case "services_history":
        setData(listServiceHistory);
        return <ServiceHistory {...props} />;

      case "cancel":
        setData(listClients);
        return <CancelContract {...props} />;

      default:
        break;
    }
  };

  return (
    <Paper
      sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", height: 600 }}
    >
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      />

      {renderScene()}
    </Paper>
  );
};

export default Content;
