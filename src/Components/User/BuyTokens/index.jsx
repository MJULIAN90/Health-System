import React from "react";
import {
  Button,
  TextField,
  Container,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { Form } from "../../Common";
import { images } from "../../../Assets";

const BuyTokens = ({ buyTokens, statusContractClient }) => {
  const image = images.card;

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        style={{
          position: "absolute",
          backgroundImage: `url(${image})`,
          backgroundColor: "red",
          height: "100%",
          width: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "grayscale(90%)",
          zIndex: 1,
        }}
      />

      <Card
        sx={{
          maxWidth: 300,
          minHeight: 400,
          right: 50,
          position: "absolute",
          zIndex: 2,
          opacity: 0.95,
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 5,
              }}
            >
              <img
                src={images.coin}
                height={160}
                width={160}
                alt='ERROR'
                style={{ borderRadius: 20 }}
              />
            </Box>
            <Form
              method={buyTokens}
              textButton='Buy Tokens'
              isDisable={statusContractClient}
            />{" "}
          </CardContent>
        </Container>
      </Card>
    </Box>
  );
};

export default BuyTokens;
