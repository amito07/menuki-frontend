import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const CategoryModal = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
        >
          <Grid item>
            <Card sx={{ minWidth: 400 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 30 }}
                  color="text.primary"
                  gutterBottom
                >
                  Add Category
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                />
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  size="medium"
                  color="error"
                >
                  Cancle
                </Button>
                <Button variant="outlined" size="medium">
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default CategoryModal;
