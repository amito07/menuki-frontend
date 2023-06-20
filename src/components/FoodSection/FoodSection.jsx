/*eslint-disable*/
import React from "react";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import FoodDetailCard from "../FoodDetailCard/FoodDetailCard";

const FoodSection = ({ food_info }) => {
  return (
    <div className="card" id={food_info?.tag}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
              {food_info?.section_title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {food_info?.section_details}
            </Typography>{" "}
          </Grid>
          {food_info.food_section.map((el, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              lg={4}
              style={{ marginBottom: "2rem" }}
            >
              <FoodDetailCard card_info={el} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default FoodSection;
