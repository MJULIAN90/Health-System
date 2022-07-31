import {
  BasicServices,
  SpecialServices,
  RechargeTockens,
  PendingRequest,
  Laboratory,
  Client,
  History,
} from "../../Admin";
import {
  LaboratoryInformation,
  ServicesLaboratory,
  Users,
  WithdrawalMoney,
} from "../../Laboratory";

import {
  BuyTokens,
  CancelContract,
  ServiceHistory,
  Services,
} from "../../User";

export const renderSceneAdmin = (props) => {
  const {
    setData,
    listBasicServices,
    listClients,
    listLaboratories,
    listSpecialServices,
    listServiceHistory,
    scene,
  } = props;

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

export const renderSceneUser = (props) => {
  const { setData, listClients, listServiceHistory, scene } = props;

  switch (scene) {
    case "buy_tokens":
      return <BuyTokens {...props} />;

    case "services":
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

export const renderSceneLaboratory = (props) => {
  const { scene, specialServiceList, listServiceHistory, setData } = props;

  switch (scene) {
    case "information":
      return <LaboratoryInformation {...props} />;

    case "services":
      setData(specialServiceList);
      return <ServicesLaboratory {...props} />;

    case "history_users":
      setData(listServiceHistory);
      return <Users {...props} />;

    case "withdrawal_money":
      return <WithdrawalMoney {...props} />;

    default:
      break;
  }
};
