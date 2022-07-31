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
  Grid,
} from "@mui/material";
import { NoInfo, SearchBar, TablePaginationScene } from "../../Common";
import { titlesHistoryUsers } from "../../Common/utils";

const Users = (props) => {
  const {
    listServiceHistory,
    getUsersHistory,
    isSearching,
    listRenderFilter,
    setisSearching,
  } = props;

  useEffect(() => {
    getUsersHistory();
    setisSearching(false);
  }, []);

  return (
    <>
      <SearchBar {...props} isName />
      <Container>
        <Grid container xs={12} mt={1}>
          <Grid item xs={12}>
            <Typography
              style={{
                backgroundColor: "#006db9",
                height: 38,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                color: "white",
                marginBottom: 8,
              }}
            >
              History users
            </Typography>
          </Grid>
        </Grid>
        <Box>
          {listServiceHistory.length === 0 ? (
            <NoInfo
              titlesList={titlesHistoryUsers}
              message={"Not history users available"}
            />
          ) : (
            <>
              <Paper>
                <TableContainer component={Paper} style={{ height: 400 }}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        {titlesHistoryUsers.map(({ title, position }) => (
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
                      {(isSearching
                        ? listRenderFilter
                        : listServiceHistory
                      ).map((element, index) => {
                        return (
                          <TableRow>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='center'>{element[1]} </TableCell>
                            <TableCell align='center'> {element[4]} </TableCell>
                            <TableCell align='center'> {element[3]} </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePaginationScene listItems={listServiceHistory} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Users;
