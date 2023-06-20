import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";


const Deposits = ({ title, item_count }) => {
  return (
    <>
      <Title>{title}</Title>
      <Typography component="p" variant="h1">
        {item_count}
      </Typography>
    </>
  );
};

export default Deposits;
