import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";

export const categories = [
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
