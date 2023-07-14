/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Dashboard from '@/components/Sidebar';
import CategoryModal from '@/components/Category/CategoryModal';
import { useSelector } from 'react-redux';
import CategoryEditModal from '@/components/Category/CategoryEditModal';

const outlet = () => {
    const [tableData, setTableData] = useState([]);
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editableContent, setEditableContent] = React.useState({});
    const [categoryName, setCategoryName] = useState({ name: '', description: '', restaurantId: null });
    const authToken =
        useSelector((state) => state.authReducer.value.accessToken) || typeof window !== 'undefined'
            ? localStorage.getItem('access_token')
            : null;
    const route = useRouter();

    const addCategory = () => {
        setOpen(true);
    };

    const handleModalClose = () => setModalOpen(false);

    const handleCategorySave = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/restaurant/create-food-category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                    body: JSON.stringify({
                        restaurant_id: categoryName.restaurantId,
                        category_name: categoryName.name,
                        description: categoryName.description,
                    }),
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditCategory = (index) => {
        const editableFood = tableData[index];
        setEditableContent(editableFood);
        setModalOpen(true);
    };

    const handleEditSave = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/food-category/${editableContent.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
            body: JSON.stringify({
                restaurant_id: editableContent.restaurantId,
                category_name: editableContent.category_name,
                description: editableContent.description,
            }),
        });
        if (res.status === 200) {
            handleModalClose();
            getCategoryData();
        }
    };

    const handleDeleteCategory = async (index) => {
        const selectedItem = tableData[index];
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/food-category/delete/${selectedItem.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 200) {
            const newTableData = [...tableData];
            newTableData.splice(index, 1);
            setTableData(newTableData);
        }
        if (res.status !== 200) {
            setErrorMsg('Something went wrong!');
            setOpen((state) => !state);
        }
    };

    const getCategoryData = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/my-food-category`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        console.log(data);
        setTableData(data);
    };

    const getMyRestaurants = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/my-restaurants`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        
        setCategoryName((prev) => ({ ...prev, restaurantId: data[0].id }));
    };

    useEffect(() => {
        if (authToken === null) {
            route.push('/login');
        }
        getCategoryData();
        getMyRestaurants();
        // setTableData(Fooddata);
    }, []);
    return (
        <>
            <Dashboard>
                <Grid container sx={{ display: 'flex', flexDirection: 'column' }} spacing={4}>
                    <Grid item alignItems="flex-end">
                        <Button onClick={addCategory} variant="outlined" startIcon={<AddIcon />}>
                            Add Category
                        </Button>
                    </Grid>
                    <Grid item>
                        <Paper sx={{ width: '100%' }}>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Category Name</TableCell>
                                            <TableCell align="center">Description</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((data, index) => (
                                            <TableRow key={data.id}>
                                                <TableCell align="center">{data.category_name}</TableCell>
                                                <TableCell align="center">{data.description}</TableCell>
                                                <TableCell
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<BorderColorIcon />}
                                                        onClick={(e) => handleEditCategory(index)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<DeleteIcon />}
                                                        sx={{ marginLeft: '5px' }}
                                                        color="error"
                                                        onClick={(e) => handleDeleteCategory(index)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Dashboard>
            <CategoryModal
                open={open}
                setOpen={setOpen}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                authToken={authToken}
                handleCategorySave={handleCategorySave}
            />
            <CategoryEditModal
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
                editableContent={editableContent}
                setEditableContent={setEditableContent}
                handleEditSave={handleEditSave}
                authToken={authToken}
            />
        </>
    );
};

export default outlet;
