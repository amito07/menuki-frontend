import { Button, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CategoryEditModal = ({ modalOpen, handleModalClose, editableContent, setEditableContent, handleEditSave, authToken }) => {
    const handleNameChange = (event) => {
        setEditableContent((prev) => ({ ...prev, category_name: event.target.value }));
    };
    const handleDescChange = (event) => {
        setEditableContent((prev) => ({ ...prev, description: event.target.value }));
    };

    const getMyRestaurants = async () => {
        const res = await fetch(`${process.env.BASE_URL}/api/restaurant/my-restaurants`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        
        setEditableContent((prev) => ({ ...prev, restaurant_id: data[0].id }));
    };
    useEffect(() => {
        getMyRestaurants();
    }, []);
    return (
        <div>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={style}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ borderBottom: 'none' }}>
                                    <h3>Name:</h3>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="outlined"
                                        value={editableContent.category_name}
                                        onChange={handleNameChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ display: 'flex', borderBottom: 'none' }}>
                                    <h3>Description:</h3>
                                </TableCell>
                                <TableCell style={{ width: '100%', borderBottom: 'none' }}>
                                    <TextField
                                        variant="outlined"
                                        value={editableContent.description}
                                        onChange={handleDescChange}
                                        multiline
                                        rows={4}
                                        style={{ width: '100%' }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Button variant="contained" style={{ marginLeft: '5px' }} onClick={handleEditSave}>
                            Save Changes
                        </Button>
                        <Button variant="contained" onClick={handleModalClose} color="error">
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default CategoryEditModal;
