import React, { useState } from "react";
import {
  AppBar,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DrawerComp from "./Drawer";
import Theme from "../styles/theme";
import LoginIcon from "@mui/icons-material/Login";

const Header = ({ type }) => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={Theme}>
      <AppBar
        sx={{ background: "#fff", boxShadow: "0 0.2rem 1rem rgba(0,0,0,.12)" }}
      >
        <Toolbar>
          <div style={{ display: "flex" }}>
            <RestaurantMenuIcon
              style={{ color: "#55CF3D", marginTop: ".8rem" }}
            />
            <Typography
              sx={{ fontSize: "2rem", paddingLeft: "10%", color: "#55CF3D" }}
            >
              MenuKi
            </Typography>
          </div>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              {type && (
                <Button
                  sx={{ marginLeft: "auto" }}
                  variant="outlined"
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
