import { Container, Grid, TextField } from "@mui/material";
import FuzzySearch from "fuzzy-search";
import { useEffect, useState } from "react";

import FoodCard from "@/components/FoodCard";
import Set from "@/components/Set";
import Fooddata from "@/data/foodlist";
import { useRouter } from "next/router";
import PublicLayout from "../components/PublicLayout";

export default function Home() {
  const [fdata, setFdata] = useState(Fooddata);
  const [copydata, setCopyData] = useState([]);
  const route = useRouter();
  const searcher = new FuzzySearch(Fooddata, ["rname"], {
    caseSensitive: false,
  });

  const handleSearch = (e) => {
    let getchangedata = e.toLowerCase();
    const result = searcher.search(getchangedata);
    setCopyData(result);
  };

  const getFoodItems = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/restaurants`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setCopyData(data);
  };
  const handleCardClick = (id) => {
    route.push(`/restaurant/${id}`);
  };
  useEffect(() => {
    getFoodItems();
  }, []);

  return (
    <PublicLayout>
      <Container maxWidth="xl">
        {" "}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ margin: "5rem 0rem" }}
        >
          <TextField
            id="outlined-search"
            label="Restaurant Search"
            type="search"
            size="small"
            sx={{ width: "50%" }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Grid>
        <Grid container spacing={2} style={{ cursor: "pointer" }}>
          {copydata && copydata.length ? (
            <FoodCard item={copydata} handleCardClick={handleCardClick} />
          ) : (
            <Set sdata={fdata} />
          )}
        </Grid>
      </Container>
    </PublicLayout>
  );
}
