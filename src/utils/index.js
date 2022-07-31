import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import { createTheme } from "@mui/material/styles";

export const accountNone = "0x0000000000000000000000000000000000000000";

export const clearDataWallets = (listWallets) => {
  return listWallets.filter((acc) => acc !== accountNone);
};

export const isContractValid = (numberContract, setnumberContract) => {
  if (numberContract !== accountNone) {
    setnumberContract(numberContract);
    return false;
  }
  return true;
};

export const handleStatusContract = (status, name) => {
  if (name === "active") {
    if (status === "active" || status === "banned" || status === "acepted")
      return true;
  }

  if (name === "unblock") {
    if (status === "active" || status === "inactive" || status === "acepted")
      return true;
  }

  if (name === "block") {
    if (status === "banned" || status === "inactive") return true;
  }
};

export const categoriesLaboratory = [
  {
    id: "Welcome",
    children: [
      {
        id: "Laboratory Information",
        icon: <HourglassBottomRoundedIcon />,
        scene: "information",
        active: true,
      },
      {
        id: "My Services",
        icon: <DnsRoundedIcon />,
        scene: "services",
      },
      {
        id: "History users",
        icon: <MedicalServicesRoundedIcon />,
        scene: "history_users",
      },
      {
        id: "Withdrawal Money",
        icon: <PeopleIcon />,
        scene: "withdrawal_money",
      },
    ],
  },
];

export const categoriesUser = [
  {
    id: "Welcome",
    children: [
      {
        id: "Buy Tokens",
        icon: <HourglassBottomRoundedIcon />,
        scene: "buy_tokens",
        active: true,
      },
      {
        id: "Services",
        icon: <DnsRoundedIcon />,
        scene: "services",
      },
      {
        id: "Service History",
        icon: <MedicalServicesRoundedIcon />,
        scene: "services_history",
      },
      { id: "My Contract", icon: <PeopleIcon />, scene: "cancel" },
    ],
  },
];

export const categoriesAdmin = [
  {
    id: "Administration",
    children: [
      {
        id: "Pending Request",
        icon: <HourglassBottomRoundedIcon />,
        scene: "pending_request",
        active: true,
      },
      {
        id: "Basic Services",
        icon: <DnsRoundedIcon />,
        scene: "basic_services",
      },
      {
        id: "Special Services",
        icon: <MedicalServicesRoundedIcon />,
        scene: "special_services",
      },
      { id: "Clients", icon: <PeopleIcon />, scene: "clients" },
      { id: "Partners", icon: <PublicIcon />, scene: "partners" },
      {
        id: "History transactions",
        icon: <TimerIcon />,
        scene: "history",
      },
      {
        id: "Create New Tockens",
        icon: <SettingsIcon />,
        scene: "recharge_tockens",
      },
    ],
  },
];

export const item = {
  py: "6px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

export const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export let theme = createTheme({
  palette: {
    primary: {
      light: "#006db9",
      main: "#006db9",
      dark: "#006db9",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};
