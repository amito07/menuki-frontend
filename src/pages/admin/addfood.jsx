/*eslint-disable*/
import Dashboard from '@/components/Sidebar';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const addfood = () => {
    const [category, setCategory] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [notification, setNotification] = useState('');
    const [inputFields, setInputFields] = useState([{ value: '' }]);
    const [foodDetails, setFoodDetails] = useState({
        name: '',
        description: '',
        price: 0,
        availability: '1',
        category_id: '',
        restaurant_id: '',
    });
    const authToken =
        useSelector((state) => state.authReducer.value.accessToken) || typeof window !== 'undefined'
            ? localStorage.getItem('access_token')
            : null;
    // const handleAddFields = () => {
    //     const values = [...inputFields];
    //     values.push({ value: '' });
    //     setInputFields(values);
    // };

    // const handleRemoveFields = (index) => {
    //     const values = [...inputFields];
    //     values.splice(index, 1);
    //     setInputFields(values);
    // };

    const handleNameChange = (event) => {
        setFoodDetails((prev) => ({ ...prev, name: event.target.value }));
    };

    const handleDescChange = (event) => {
        setFoodDetails((prev) => ({ ...prev, description: event.target.value }));
    };
    const handleCategoryChange = (event) => {
        setFoodDetails((prev) => ({ ...prev, category_id: event.target.value }));
    };

    const handlePriceChange = (event) => {
        setFoodDetails((prev) => ({ ...prev, price: event.target.value }));
    };

    const handleAvalabilityClick = (event) => {
        setFoodDetails((prev) => ({ ...prev, availability: prev.availability === '1' ? '0' : '1' }));
    };

    const handleSnackBarClose = () => setOpenSnackBar(false);

    const getCategoryList = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/my-food-category`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        setCategoryList(data);
    };

    const onImageChange = (event) => {

        setSelectedImage(event.target.files[0]);
    };

    const handleSaveClick = async () => {
        const boundary = `----${Date.now().toString(16)}`;

        const formData = new FormData();
        const obj = {
            restaurant_id: foodDetails.restaurant_id,
            category_id: foodDetails.category_id,
            food_name: foodDetails.name,
            food_description: foodDetails.description,
            price: foodDetails.price,
            is_available: foodDetails.availability,
            image: selectedImage
        };

        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/add-foods`, {
            method: 'POST',
            headers: {
                'Content-Type': `application/json`,
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(obj),
        });
        const data = await res.json();
    };

    const getMyRestaurants = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/my-restaurants`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        setFoodDetails((prev) => ({ ...prev, restaurant_id: data[0].id }));
    };

    useEffect(() => {
        getCategoryList();
        getMyRestaurants();
    }, []);
    return (
        <Dashboard>
            <Grid container spacing={[0, 3]}>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ width: '80%' }}
                        id="outlined-basic"
                        label="Food Name"
                        variant="outlined"
                        fullWidth
                        value={foodDetails.name}
                        onChange={handleNameChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            sx={{ width: '80%' }}
                            id="demo-simple-select"
                            value={foodDetails.category_id}
                            onChange={handleCategoryChange}
                        >
                            {categoryList.map((cat) => (
                                <MenuItem value={cat.id} key={cat.id}>
                                    {cat.category_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ width: '59%' }}
                        id="outlined-basic"
                        label="Description"
                        multiline
                        variant="outlined"
                        fullWidth
                        value={foodDetails.description}
                        onChange={handleDescChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        sx={{ width: '59%' }}
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        type="number"
                        value={foodDetails.price}
                        onChange={handlePriceChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Availability</InputLabel>
                    <Switch
                        checked={foodDetails.availability === '1' ? true : false}
                        onClick={handleAvalabilityClick}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <input type="file" multiple accept="image/*" onChange={onImageChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button onClick={handleSaveClick} variant="contained">
                        Save
                    </Button>
                </Grid>
            </Grid>
            {/* <Divider />
            <Grid container sx={{ marginTop: '10px' }}>
                <Grid item xs={12} md={6}>
                    {inputFields.map((inputField, index) => (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '10px',
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
                                <IconButton onClick={() => handleRemoveFields(index)} aria-label="delete">
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            )}
                        </div>
                    ))}
                </Grid>
            </Grid> */}
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="error" sx={{ width: '100%' }}>
                    {notification}
                </Alert>
            </Snackbar>
        </Dashboard>
    );
};

export default addfood;
