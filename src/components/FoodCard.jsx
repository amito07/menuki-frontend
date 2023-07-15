import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function FoodCard({ item, handleCardClick }) {
  return (
    <>
      {item.map((el) => (
        <Grid key={el.id} item xs={6} sm={6} md={3}>
          <Card
            sx={{ maxWidth: 345 }}
            onClick={() => handleCardClick(el.id)}
          >
            <CardMedia
              component="img"
              height="194"
              image={`${process.env.BASE_URL}/${el.cover_pic}`}
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
