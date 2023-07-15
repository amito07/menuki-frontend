import FoodSection from "@/components/FoodSection/FoodSection";
import PublicLayout from "@/components/PublicLayout";
import { data } from "@/data/test";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-scroll";

const Restaurant = () => {
  const [dynamicHeight, setdynamicHeight] = useState("40vh");

  const isDeskTop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    if (isDeskTop) {
      setdynamicHeight("80vh");
    } else {
      setdynamicHeight("40vh");
    }
  }, [isDeskTop]);


  return (
    <PublicLayout type={false}>
      <Container maxWidth="xl">
        <div className="header__wrapper">
          <div className="amit">
            <img
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 20%",
                width: "100%",
                backgroundSize: "cover",
                height: dynamicHeight,
              }}
              src={data.cover_pic}
              alt="Anna Smith"
            />
          </div>
          <div className="cols__container">
            <div className="left__col">
              <div className="img__container">
                <img src={data.profile_pic} alt="Anna Smith" />
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <Grid container style={{ marginTop: "5rem" }}>
          <Grid xs={12} item>
            <div className="menulist">
              <div className="list-div">
                <ul className="list">
                  {data.item_list.map((el, index) => (
                    <li key={index}>
                      {" "}
                      {/* Added key prop */}
                      <Link
                        to={el.tag}
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={500}
                      >
                        {el.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>
          {data.food_detail.map((el, index) => (
            <Grid item xs={12} key={index}>
              {" "}
              {/* Added key prop */}
              <FoodSection food_info={el} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PublicLayout>
  );
};

export default Restaurant;
