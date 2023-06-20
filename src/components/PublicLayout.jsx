import { Grid } from "@mui/material";
import { padding } from "@mui/system";
import React from "react";
import Header from "./Header";
import Footer from "./Footer/Footer";

const PublicLayout = ({ children, type }) => {
  return (
    <>
    <Header type={type} />
    {children}
    </>
    // <Grid container>
    //   <Grid item >
    //     <Header type={type} />
    //   </Grid>
    //   <div>
    //     {children}
    //   </div>
    //   <Grid item>
    //     <Footer/>
    //   </Grid>
    // </Grid>
  );
};

export default PublicLayout;
