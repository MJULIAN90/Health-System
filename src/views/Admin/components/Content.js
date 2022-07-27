import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import {
  BasicServices,
  SpecialServices,
  RechargeTockens,
  PendingRequest,
  Laboratory,
  Client,
  History,
} from "../../../Components/Admin";
import { useMemo } from "react";

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
    setListRenderFilter([]);
  }, [scene]);

  const renderScene = () => {
    switch (scene) {
      case "pending_request":
        return <PendingRequest {...props} />;

      case "basic_services":
        setData(listBasicServices);
        return <BasicServices {...props} />;

      case "special_services":
        setData(listSpecialServices);
        return <SpecialServices {...props} />;

      case "clients":
        setData(listClients);
        return <Client name={"Client"} {...props} />;

      case "partners":
        setData(listLaboratories);
        return <Laboratory name={"Laboratory"} {...props} />;

      case "history":
        setData(listServiceHistory);
        return <History {...props} />;

      case "recharge_tockens":
        return <RechargeTockens {...props} />;

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
