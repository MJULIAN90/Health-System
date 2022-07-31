import React, { useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { titlesHistoryTransaction } from "../../Common/utils";
import { NoInfo, SearchBar, TablePaginationScene } from "../../Common";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const ServiceHistory = (props) => {
  const {
    getHistoryTransaction,
    listServiceHistory,
    setisSearching,
    listRenderFilter,
    isSearching,
  } = props;

  useEffect(() => {
    getHistoryTransaction();
    setisSearching(false);
  }, []);

  return (
    <>
      <SearchBar {...props} isHistory />
      <Container>
        {listServiceHistory && listServiceHistory.length > 0 ? (
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
              Special Services
            </Typography>
            <Paper>
              <TableContainer component={Paper} style={{ height: 400 }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {titlesHistoryTransaction.map(({ title, position }) => (
                        <TableCell
                          align={position}
                          style={{ fontWeight: "bold" }}
                        >
                          {title.toUpperCase()}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(isSearching ? listRenderFilter : listServiceHistory).map(
                      (element, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>{element[0]}</TableCell>
                            <TableCell>{element[1]}</TableCell>
                            <TableCell align='center'>
                              {element[2].toUpperCase()}
                            </TableCell>
                            <TableCell align='center'>
                              {element[4].toUpperCase()}
                            </TableCell>
                            <TableCell align='center'>
                              <Box style={{ display: "flex" }}>
                                <Typography mr={2} ml={3}>
                                  {element[3]}
                                </Typography>
                                <RocketLaunchIcon />
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <TablePaginationScene listItems={listServiceHistory} />
          </>
        ) : (
          <NoInfo
            titlesList={titlesHistoryTransaction}
            message={"Not history services available"}
            sceneMessage={"History"}
            isHeader
          />
        )}
      </Container>
    </>
  );
};

export default ServiceHistory;
