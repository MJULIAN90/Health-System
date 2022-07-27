import {
  Container,
  List,
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
  Grid,
} from "@mui/material";
import React from "react";
import { handleStatusContract } from "../../../utils";
import NoInfo from "../NoInfo";
import { titlesClients } from "../utils";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TablePaginationScene from "../PaginationScene";
import SearchBar from "../SearchBar";

const InfoClient = ({ name, list, unBanUser, banUser }) => {
  const nullContract = "0x0000000000000000000000000000000000000000";

  return (
    <>
      <SearchBar />
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
                      {list.map((service, index) => {
                        const {
                          wallet,
                          addresContract,
                          status,
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
                              {" "}
                              {statusContract.toUpperCase()}{" "}
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
                                  banUser(wallet);
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
                                  unBanUser(wallet);
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
                                  unBanUser(wallet);
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
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePaginationScene listItems={list} />
            </>

            //   <List>
            //     {list.map((service) => {
            //       const {
            //         wallet,
            //         addresContract,
            //         status,
            //         statusContract,
            //         BalanceUser,
            //       } = service;

            //       return (
            //         <>
            //           <ul key={wallet}>
            //             <li> Address: {wallet} </li>
            //             <li>
            //               {" "}
            //               {addresContract !== nullContract
            //                 ? `Number contract: ${addresContract.toUpperCase()}`
            //                 : "Number contract: NO AVAILABLE"}{" "}
            //             </li>
            //             <li> Account status: {status ? "ACTIVE" : "INACTIVE"}</li>
            //             <li> Status contract: {statusContract.toUpperCase()}</li>
            //             <li> Balance contract: {BalanceUser} tockens</li>
            //           </ul>
            //           <Button
            //             onClick={() => {
            //               banUser(wallet);
            //             }}
            //             disabled={handleStatusContract(statusContract, "block")}
            //           >
            //             {" "}
            //             Block contract{" "}
            //           </Button>
            //           <Button
            //             onClick={() => {
            //               unBanUser(wallet);
            //             }}
            //             disabled={handleStatusContract(statusContract, "unblock")}
            //           >
            //             {" "}
            //             Unblock contract{" "}
            //           </Button>
            //           <Button
            //             onClick={() => {
            //               unBanUser(wallet);
            //             }}
            //             disabled={handleStatusContract(statusContract, "active")}
            //           >
            //             {" "}
            //             Active contract{" "}
            //           </Button>
            //         </>
            //       );
            //     })}
            //   </List>
          )}
        </Box>
      </Container>
    </>
  );
};

export default InfoClient;
