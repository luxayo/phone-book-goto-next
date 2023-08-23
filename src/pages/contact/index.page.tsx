import {
  Box,
  Divider,
  Fab,
  Grid,
  IconButton,
  Input,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { useRouter } from "next/router";
import { useGetContactListQuery } from "@api/generated";

const Contact = () => {
  const router = useRouter();

  const handleAddContactButton = () => {
    // router.push("/contact/new");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      spacing={1}
      maxWidth="800px"
    >
      <Grid container item>
        <Box
          sx={{
            padding: "0",
            border: "1px solid black",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton
            type="button"
            sx={{
              p: "10px",
            }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid container direction="column" item spacing={1}>
        <Grid container direction="column" item>
          <Grid item>
            <Typography>Lucio</Typography>
          </Grid>
          <Grid item>
            <Typography>0821</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container direction="column" item>
          <Grid item>
            <Typography>Lucio</Typography>
          </Grid>
          <Grid item>
            <Typography>0821</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddContactButton}
        sx={{ position: "absolute", right: 15, bottom: 15 }}
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
};

export default Contact;
