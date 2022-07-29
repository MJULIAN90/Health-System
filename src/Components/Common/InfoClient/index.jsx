import {
  Container,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { handleStatusContract } from "../../../utils";
import NoInfo from "../NoInfo";
import { titlesClients } from "../utils";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TablePaginationScene from "../PaginationScene";
import SearchBar from "../SearchBar";

const InfoClient = (props) => {
  const {
    name,
    list,
    onBanUser,
    onUnBanUser,
    isSearching,
    listRenderFilter,
  } = props;

  const nullContract = "0x0000000000000000000000000000000000000000";

  return (
    <>
      <SearchBar {...props} isWallet />
      <Container>
        <Box>
          {list.length === 0 ? (
            <NoInfo
              titlesList={titlesClients}
              message={`we do not have ${
                name === "Laboratory" ? "Partners" : "Clients"
              }`}
              sceneMessage={name === "Laboratory" ? "Partners" : "Clients"}
              isHeader
            />
          ) : (
            <>
              <Typography
                style={{
                  backgroundColor: "#006DB9",
                  height: 38,
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 18,
                  color: "white",
                  marginBottom: 10,
                }}
              >
                Clients
              </Typography>
              <Paper>
                <TableContainer component={Paper} style={{ height: 400 }}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        {titlesClients.map(({ title, position }) => (
                          <TableCell
                            align={position}
                            style={{ fontWeight: "bold" }}
                          >
                            {title.toUpperCase()}{" "}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {(isSearching ? listRenderFilter : list).map(
                        (service, index) => {
                          const {
                            wallet,
                            addresContract,
                            statusContract,
                            BalanceUser,
                          } = service;
                          return (
                            <TableRow key={index}>
                              <TableCell align='center'>{index + 1}</TableCell>
                              <TableCell align='left'> {wallet} </TableCell>
                              <TableCell>
                                {addresContract !== nullContract
                                  ? `${addresContract.toUpperCase()}`
                                  : "⌛"}
                              </TableCell>
                              <TableCell align='left'>
                                {statusContract.toUpperCase()}
                              </TableCell>
                              <TableCell align='center'>
                                <Box style={{ display: "flex" }}>
                                  <Typography mr={2} ml={3}>
                                    {BalanceUser}
                                  </Typography>
                                  <RocketLaunchIcon />
                                </Box>
                              </TableCell>

                              <TableCell align='center'>
                                <Button
                                  onClick={() => {
                                    onBanUser(wallet);
                                  }}
                                  disabled={handleStatusContract(
                                    statusContract,
                                    "block"
                                  )}
                                >
                                  🚫
                                </Button>
                              </TableCell>

                              <TableCell align='center'>
                                <Button
                                  onClick={() => {
                                    onUnBanUser(wallet);
                                  }}
                                  disabled={handleStatusContract(
                                    statusContract,
                                    "unblock"
                                  )}
                                >
                                  🚀
                                </Button>
                              </TableCell>

                              <TableCell align='center'>
                                <Button
                                  onClick={() => {
                                    onUnBanUser(wallet);
                                  }}
                                  disabled={handleStatusContract(
                                    statusContract,
                                    "active"
                                  )}
                                >
                                  ✅
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePaginationScene listItems={list} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default InfoClient;
