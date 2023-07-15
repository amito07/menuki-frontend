/*eslint-disable*/
import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import FoodDetailCard from "../FoodDetailCard/FoodDetailCard";

const FoodSection = ({ food_info }) => {
  console.log("food_info", food_info.foodlist);
  return (
    <div className="card" id={food_info?.id}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
              {food_info?.category_name}
            </Typography>
          </Grid>
          {food_info?.foodlist.length === 0 && (
            <>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  gutterBottom
                >
                  Product Not Available
                </Typography>
              </Grid>
            </>
          )}
          {food_info.foodlist.map((el, index) => (
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
