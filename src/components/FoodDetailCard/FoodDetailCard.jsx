/*eslint-disable*/
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FoodDetailCard = ({ card_info }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log("card_info", card_info);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={card_info.img_url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          {card_info.food_title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" spacing={1}>
          <Chip
            label={card_info.available ? "Available" : "Unavailable"}
            color={card_info.available ? "success" : "error"}
          />
          <Chip
            label={card_info?.price ? `৳ ${card_info?.price}` : "৳ 00"}
            color="success"
          />
        </Stack>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h5">Variation:</Typography>
          <Divider />
          {card_info?.variants?.map((el, i) => (
            <div key={i} className="variant">
              <Typography variant="h6">{el.size}</Typography>
              <Typography variant="h6">Tk {el.price}</Typography>
            </div>
          ))}

          <Typography style={{ marginTop: "1rem" }} variant="h5">
            Description:
          </Typography>
          <Divider />
          <Typography style={{ marginTop: "1rem" }} paragraph>
            {card_info?.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default FoodDetailCard;
