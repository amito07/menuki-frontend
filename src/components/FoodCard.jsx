import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function FoodCard({ item }) {
  return (
    <>
      {item.map((el, i) => {
        return (
          <>
            <Grid key={i} item xs={6} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={el.imgdata}
                  alt="Paella dish"
                />
                <CardContent>
                  <Grid container>
                    <Grid item>
                      <Typography variant="h5">{el.rname}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </>
        );
      })}
    </>
  );
}