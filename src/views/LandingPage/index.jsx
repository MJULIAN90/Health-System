import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { images } from "../../../src/Assets";

const LandingPage = ({ getNewLaboratory, getNewUser, getRole, onSumit }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getRole();
  }, []);

  const hamdleSumit = () => {
    onSumit(navigate);
  };

  const onLaboratory = async () => {
    getNewLaboratory();
  };

  const onNewUser = async () => {
    getNewUser();
  };

  return (
    <Container maxWidth={false} style={{ height: 700 }}>
      <Box mt={3}>
        <img src={images.banner} height={300} width={"100%"} alt='ERROR' />
      </Box>

      <Grid container spacing={4} mt={4}>
        <Grid item xs={4}>
          <Box
            variant='rectangular'
            width={"100%"}
            height={400}
            borderRadius={5}
          >
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                height: 630,
              }}
            >
              <Box
                display={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  height: 200,
                }}
              >
                <Typography
                  variant='h3'
                  mb={5}
                  textTransform='capitalize'
                  textAlign={"center"}
                >
                  Do you want to be partner?
                </Typography>
              </Box>

              <Typography mb={3} textAlign={"justify"}>
                If you want to be part of the most prestigious service providers
                this is the right place join our great network of service
                provider offices for users from all over the world you will
                receive your payments with our token and you will be able to
                withdraw your ethereum currency.
              </Typography>
              <Container
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginBottom: 18,
                }}
              >
                <img src={images.sign} height={190} width={200} alt='ERROR' />
              </Container>

              <Button
                onClick={onLaboratory}
                variant='contained'
                style={{
                  textAlign: "center",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  margin: "auto",
                }}
              >
                Join us
              </Button>
            </Container>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              height: 630,
              position: "relative",
            }}
          >
            <Box
              style={{
                height: 200,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant='h3'
                textTransform='capitalize'
                textAlign={"center"}
              >
                ROCKET COMPANY
              </Typography>
            </Box>

            <Box>
              <Typography mb={1} textAlign={"justify"}>
                We are a health services company, we work with blockchain
                technology and web3 technology, our tokens can be exchanged for
                ethereum currency. all our information will remain in the
                blockchain system protecting all the data and ensuring that they
                will not be altered.
              </Typography>

              <Typography mb={1} textAlign={"justify"}>
                we invite both service providers and users to enjoy the services
                we are providing at very good prices.
              </Typography>

              <Typography mb={1} textAlign={"justify"}>
                after your registration you can start your session..
              </Typography>

              <Button
                height={"30%"}
                onClick={hamdleSumit}
                variant='contained'
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  margin: "auto",
                }}
              >
                sign in
              </Button>
            </Box>
          </Container>
        </Grid>

        <Grid item xs={4}>
          <Container
            style={{ position: "relative", height: 630, width: "100%" }}
          >
            <Box
              display={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                height: 200,
              }}
            >
              <Typography
                variant='h3'
                textTransform='capitalize'
                textAlign={"center"}
              >
                Do You Want To Be client?
              </Typography>
            </Box>
            <Box variant='rectangular' width={"100%"} height={400}>
              <Typography mb={1}>
                Welcome to the largest network of services, all your data will
                be safe with us, you can make your payments through our network
                with which you must acquire tokens for such transactions.
              </Typography>
              <Typography marginBottom={5}>
                we invite you to purchase our policy and enjoy our benefits.
              </Typography>

              <Container
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: -30,
                }}
              >
                <img
                  src={images.iconUser}
                  height={200}
                  width={200}
                  alt='ERROR'
                  style={{ borderRadius: "50%" }}
                />
              </Container>
            </Box>
            <Button
              onClick={onNewUser}
              variant='contained'
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto",
              }}
            >
              Purchase Policy
            </Button>
          </Container>
        </Grid>
      </Grid>

      <Grid container>
        <img
          src={images.footer}
          height={215}
          width={"100%"}
          alt='ERROR'
          style={{ position: "absolute", bottom: 0, zIndex:-1 }}
        />
      </Grid>
    </Container>
  );
};

export default LandingPage;
