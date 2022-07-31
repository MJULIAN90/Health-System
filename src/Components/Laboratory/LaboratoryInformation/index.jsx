import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { images } from "../../../Assets";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const LaboratoryInformation = (props) => {
  const {
    cancelContract,
    account,
    balanceEthers,
    numberContract,
    balanceLaboratory,
  } = props;
  return (
    <Box style={{ position: "relative", height: "100%" }}>
      <Box style={{ position: "absolute", width: "100%", textAlign: "center" }}>
        <Typography variant='h4' mt={5}>
          {"INFORMATION "}
        </Typography>
      </Box>
      <Grid
        container
        xs={12}
        style={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          src={images.logoBack}
          height={200}
          width={200}
          alt='ERROR'
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
          }}
        />

        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Account: ${account} `}
                secondary='Address'
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MonetizationOnIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Balance: ${balanceEthers / 10 ** 18}`}
                secondary='ETh'
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CurrencyExchangeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Tockens: ${balanceLaboratory}`}
                secondary='RC'
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Contract: ${numberContract}`}
                secondary='Number'
              />
            </ListItem>
          </List>
        </Grid>

        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.95,
          }}
        >
          <Card style={{ marginLeft: "20%" }}>
            <CardContent
              style={{
                display: "flex",
                marginBottom: 5,
                flexDirection: "column",
                height: 350,
                width: 240,
                position: "relative",
                backgroundColor: "transparent",
              }}
            >
              <Typography variant='h6' align='center'>
                {" "}
                Do you want to cancel?
              </Typography>
              <img
                src={images.cancelLaboratory}
                height={200}
                width={"100%"}
                alt='ERROR'
                style={{ borderRadius: 10 }}
              />
              <Button
                variant='contained'
                onClick={cancelContract}
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "96%",
                  height: 60,
                  left: 5,
                  right: 5,
                }}
              >
                {"Cancel Contract "}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <img src={images.footer} height={100} width={"100%"} alt='ERROR' />
      </Box>
    </Box>
  );
};

export default LaboratoryInformation;
