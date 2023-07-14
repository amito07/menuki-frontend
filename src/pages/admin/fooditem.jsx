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
import Dashboard from '@/components/Sidebar';
import Fooddata from '@/data/foodlist';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FoodEditModal from '@/components/FoodSection/FoodEditModal';

const columns = [
    { id: 'images', label: 'Images', align: 'center' },
    { id: 'name', label: 'Food Name' },
    { id: 'price', label: 'Price' },
    { id: 'action', label: 'Action', align: 'center' },
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const fooditem = () => {
    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [tableData, setTableData] = useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editableContent, setEditableContent] = React.useState({});
    const authToken =
        useSelector((state) => state.authReducer.value.accessToken) || typeof window !== 'undefined'
            ? localStorage.getItem('access_token')
            : null;
    const route = useRouter();

    const handleAddFood = () => {
        route.push('/admin/addfood');
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleModalClose = () => setModalOpen(false);

    const handleEditFood = (index) => {
        const editableFood = tableData[index];
        setEditableContent(editableFood);
        setModalOpen(true);
    };

    const handleEditSave = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/update-food/${editableContent.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
            body: JSON.stringify({
                category_id: editableContent.category_id,
                restaurant_id: editableContent.restaurant_id,
                user_id: editableContent.user_id,
                food_name: editableContent.name,
                food_description: editableContent.description,
                price: editableContent.price,
                is_available: editableContent.is_available,
                ratio: editableContent.ratio,
            }),
        });
        if (res.status === 200) {
            handleModalClose();
            getFoodData();
        }
    };

    const handleDeleteFood = async (index) => {
        const selectedItem = tableData[index];
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/delete-food/${selectedItem.id}`, {
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
    const getFoodData = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/my-foods`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        console.log(data);
        setTableData(data);
    };
    useEffect(() => {
        if (authToken === null) {
            route.push('/login');
        }
        getFoodData();
        // setTableData(Fooddata);
    }, []);
    return (
        <Dashboard>
            <Grid container sx={{ display: 'flex', flexDirection: 'column' }} spacing={4}>
                <Grid item alignItems="flex-end">
                    <Button onClick={handleAddFood} variant="outlined" startIcon={<AddIcon />}>
                        Add Food Item
                    </Button>
                </Grid>
                <Grid item>
                    <Paper sx={{ width: '100%' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((data, index) => (
                                        <TableRow key={data.id}>
                                            <TableCell align="center">
                                                <Image
                                                    src={`${process.env.BASE_URL}/storage/${data.image}`}
                                                    alt="image"
                                                    width={100}
                                                    height={100}
                                                />
                                            </TableCell>
                                            <TableCell>{data.name}</TableCell>
                                            <TableCell align="left">${data.price}</TableCell>
                                            <TableCell
                                                sx={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<BorderColorIcon />}
                                                    onClick={(e) => handleEditFood(index)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<DeleteIcon />}
                                                    sx={{ marginLeft: '5px' }}
                                                    color="error"
                                                    onClick={(e) => handleDeleteFood(index)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <FoodEditModal
                            modalOpen={modalOpen}
                            handleModalClose={handleModalClose}
                            editableContent={editableContent}
                            setEditableContent={setEditableContent}
                            handleEditSave={handleEditSave}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </Dashboard>
    );
};

export default fooditem;
