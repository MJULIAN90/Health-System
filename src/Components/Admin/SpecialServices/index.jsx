import React, { useEffect } from "react";
import { NoInfo, SearchBar, TablePaginationScene } from "../../Common";
import { titlesListSpecialService } from "../../Common/utils";
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
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const SpecialServices = (props) => {
  const {
    listSpecialServices,
    getSpecialServices,
    setisSearching,
    listRenderFilter,
    isSearching,
  } = props;

  useEffect(() => {
    getSpecialServices();
    setisSearching(false);
  }, []);

  return (
    <>
      <SearchBar {...props} isName />
      <Container>
        {listSpecialServices.length === 0 ? (
          <Box>
            <NoInfo
              titlesList={titlesListSpecialService}
              message={"Not special services available"}
              sceneMessage={"Special Services"}
              isHeader
            />
          </Box>
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
              Special Services
            </Typography>
            <Paper>
              <TableContainer component={Paper} style={{ height: 400 }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {titlesListSpecialService.map(({ title, position }) => (
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
                    {(isSearching ? listRenderFilter : listSpecialServices).map(
                      (element, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align='center'>{index + 1}</TableCell>
                            <TableCell align='left'>
                              {element[0].toUpperCase()}
                            </TableCell>
                            <TableCell>{element[3]}</TableCell>
                            <TableCell align='center'>
                              <Box style={{ display: "flex" }}>
                                <Typography mr={2} ml={3}>
                                  {element[1]}
                                </Typography>
                                <RocketLaunchIcon />
                              </Box>{" "}
                            </TableCell>
                            <TableCell align='center'>
                              {element[2] ? "✅" : "❌"}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <TablePaginationScene listItems={titlesListSpecialService} />
          </>
        )}
      </Container>
    </>
  );
};

export default SpecialServices;
