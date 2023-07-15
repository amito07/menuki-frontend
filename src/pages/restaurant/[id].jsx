import { data } from "@/data/test";
import { Container, Grid } from "@mui/material";
import { Link } from "react-scroll";

import FoodSection from "@/components/FoodSection/FoodSection";
import PublicLayout from "@/components/PublicLayout";

const restaurant = () => {
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
                height: "80vh",
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
                    <li>
                      <Link
                        key={index}
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
            <Grid item xs={12}>
              <FoodSection food_info={el} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </PublicLayout>
  );
};

export default restaurant;
