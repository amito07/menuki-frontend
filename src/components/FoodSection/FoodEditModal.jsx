import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Table, TableBody, TableCell, TableRow, TextField, Switch } from '@mui/material';

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

const FoodEditModal = ({ modalOpen, handleModalClose, editableContent, setEditableContent, handleEditSave }) => {
    const handleNameChange = (event) => {
        setEditableContent((prev) => ({ ...prev, name: event.target.value }));
    };
    const handlePriceChange = (event) => {
        setEditableContent((prev) => ({ ...prev, price: event.target.value }));
    };
    const handleDescChange = (event) => {
        setEditableContent((prev) => ({ ...prev, description: event.target.value }));
    };
    const handleIsAvailableChange = (event) => {
        setEditableContent((prev) => ({ ...prev, is_available: editableContent.is_available === '1' ? '0' : '1' }));
    };
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
                                        value={editableContent.name}
                                        onChange={handleNameChange}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ display: 'flex', borderBottom: 'none' }}>
                                    <h3>Description:</h3>
                                </TableCell>
                                <TableCell style={{ width: '100%' }}>
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
                            <TableRow>
                                <TableCell style={{ borderBottom: 'none' }}>
                                    <h3>Price:</h3>
                                </TableCell>
                                <TableCell style={{ borderBottom: 'none' }}>
                                    <TextField
                                        variant="outlined"
                                        value={editableContent.price}
                                        onChange={handlePriceChange}
                                        type="number"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ borderBottom: 'none' }}>
                                    <h3>Availability:</h3>
                                </TableCell>
                                <TableCell style={{ borderBottom: 'none' }}>
                                    <Switch
                                        checked={editableContent.is_available === '1' ? true : false}
                                        onClick={handleIsAvailableChange}
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

export default FoodEditModal;
