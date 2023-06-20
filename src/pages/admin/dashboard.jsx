import React from "react";
import Dashboard from "@/components/Sidebar";
import { Grid, Paper } from "@mui/material";
import Chart from "../../components/Chart";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";

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
