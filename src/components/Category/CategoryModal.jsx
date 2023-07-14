import { Button, Card, CardActions, CardContent, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CategoryModal = ({ open, setOpen, categoryName, setCategoryName, authToken, handleCategorySave }) => {
    const handleClose = () => setOpen(false);
    const [myRestaurantList, setMyRestaurantList] = useState([]);

    const handleCategoryNameChange = (event) => {
        setCategoryName((prev) => ({ ...prev, name: event.target.value }));
    };
    const handleCategoryDescriptionChange = (event) => {
        setCategoryName((prev) => ({ ...prev, description: event.target.value }));
    };
    const getMyRestaurants = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/my-restaurants`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        
        setCategoryName((prev) => ({ ...prev, restaurantId: data[0].id }));
    };

    useEffect(() => {
        getMyRestaurants();
    }, []);
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                    <Grid item>
                        <Card sx={{ minWidth: 400 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                                    Add Category
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Category"
                                    variant="outlined"
                                    value={categoryName.name}
                                    onChange={handleCategoryNameChange}
                                />
                            </CardContent>
                            <CardContent>
                                <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                                    Add Category Description
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Category"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={categoryName.description}
                                    onChange={handleCategoryDescriptionChange}
                                />
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={() => setOpen(false)} variant="outlined" size="medium" color="error">
                                    Cancel
                                </Button>
                                <Button variant="outlined" size="medium" onClick={handleCategorySave}>
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
