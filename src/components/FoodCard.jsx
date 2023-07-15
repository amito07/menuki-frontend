import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function FoodCard({ item, handleCardClick }) {
  return (
    <>
      {item.map((el, i) => (
        <Grid key={i} item xs={6} sm={6} md={3}>
          <Card
            key={el.id} // Use a unique key from the data item instead of the index
            sx={{ maxWidth: 345 }}
            onClick={(e) => handleCardClick(el.id)}
          >
            <CardMedia
              component="img"
              height="194"
              image={`${process.env.BASE_URL}/storage/${el.cover_pic}`}
              alt="Paella dish"
            />
            <CardContent>
              <Grid container>
                <Grid item>
                  <Typography variant="h5">{el.name}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}
