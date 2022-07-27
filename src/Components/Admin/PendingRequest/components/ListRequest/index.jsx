import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import { NoInfo, TablePaginationScene } from "../../../../Common";
import { titlesListRequest } from "../../../../Common/utils";

const ListRequest = ({
  name,
  getPendintRequest,
  listPendingClient,
  listPendingLaboratory,
  getEnableSubscription,
}) => {
  useEffect(() => {
    getPendintRequest(name);
  }, [name]);

  const Render = ({ listItems }) => {
    if (listItems.length > 0) {
      return (
        <>
          <Paper>
            <TableContainer component={Paper} style={{ height: 400 }}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    {titlesListRequest.map(({ title, position }) => (
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
                  {listItems.map((address, index) => (
                    <TableRow key={address}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <Avatar>
                          <AccountBalanceWalletTwoToneIcon />
                        </Avatar>
                      </TableCell>
                      <TableCell align='left'>{address}</TableCell>
                      <TableCell align='right'>
                        <Button onClick={() => getEnableSubscription(address)}>
                          ✅
                        </Button>
                      </TableCell>
                      <TableCell align='right'>
                        <Button>❌</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <TablePaginationScene listItems={listItems} />
        </>
      );
    }

    return (
      <NoInfo message={"No pending request"} titlesList={titlesListRequest} />
    );
  };

  return (
    <Container>
      {name === "Client" ? (
        <>
          <Render listItems={listPendingClient} />
        </>
      ) : (
        <>
          <Render listItems={listPendingLaboratory} />
        </>
      )}
    </Container>
  );
};

export default ListRequest;
