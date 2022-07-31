import { Grid, Paper, TextField, Toolbar } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const {
    setListRenderFilter,
    setisSearching,
    isName,
    isWallet,
    isHistory,
    isUserHistory,
    data,
  } = props;

  const handleOnChange = (e) => {
    if (e.target.value.length === 0) {
      setListRenderFilter([]);
      setisSearching(false);
    }

    if (isName) {
      const dataFilter = data.filter((item) =>
        item[0].toLowerCase().includes(e.target.value.toLowerCase())
      );
      setisSearching(true);
      setListRenderFilter(dataFilter);
    }

    if (isWallet) {
      const dataFilter = data.filter((item) =>
        item.wallet.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setisSearching(true);
      setListRenderFilter(dataFilter);
    }

    if (isHistory) {
      const dataFilter = data.filter((item) =>
        item[0].toLowerCase().includes(e.target.value.toLowerCase())
      );
      setisSearching(true);
      setListRenderFilter(dataFilter);
    }

    if (isUserHistory) {
      const dataFilter = data.filter((item) =>
        item[4].toLowerCase().includes(e.target.value.toLowerCase())
      );
      setisSearching(true);
      setListRenderFilter(dataFilter);
    }
  };

  return (
    <Paper>
      <Toolbar>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <SearchIcon color='inherit' sx={{ display: "block" }} />
          </Grid>
          <Grid item xs>
            <TextField
              onChange={handleOnChange}
              fullWidth
              placeholder={
                isName || isUserHistory
                  ? "Search by name service"
                  : isWallet
                  ? "Search by address wallet"
                  : "Search by address wallet laboratory"
              }
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant='standard'
            />
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
};

export default SearchBar;
