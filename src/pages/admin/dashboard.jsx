import React from "react";
import { Grid, Paper } from "@mui/material";
import Dashboard from "@/components/Sidebar";
import Deposits from "../../components/Deposits";

const dashboard = () => {
  return (
    <Dashboard>
      <Grid container spacing={2} justify="center" alignItems="center">
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits title={"Number of Categories"} item_count={5} />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits title={"Number of Foods"} item_count={50} />
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default dashboard;
