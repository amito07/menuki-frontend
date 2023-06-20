/*eslint-disable*/
import React, { useState } from "react";
import Dashboard from "@/components/Sidebar";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const addfood = () => {
  const [category, setCategory] = useState("");
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ value: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <Dashboard>
      <Grid container spacing={[0, 3]}>
        <Grid item xs={12} md={6}>
          <TextField
            sx={{ width: "80%" }}
            id="outlined-basic"
            label="Food Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              sx={{ width: "80%" }}
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            sx={{ width: "59%" }}
            id="outlined-basic"
            label="Description"
            multiline
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Available"
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ marginTop: "10px" }}>
        <Grid item xs={12} md={6}>
          {inputFields.map((inputField, index) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
              key={index}
            >
              <TextField
                label={`Input Field ${index + 1}`}
                value={inputField.value}
                onChange={(e) => {
                  const values = [...inputFields];
                  values[index].value = e.target.value;
                  setInputFields(values);
                }}
              />
              <IconButton onClick={handleAddFields} aria-label="delete">
                <AddCircleOutlineIcon />
              </IconButton>
              {index !== 0 && (
                <IconButton
                  onClick={() => handleRemoveFields(index)}
                  aria-label="delete"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              )}
            </div>
          ))}
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default addfood;
