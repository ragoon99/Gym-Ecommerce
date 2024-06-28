/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import {
    Dialog,
    Button,
    Select,
    MenuItem,
    TextField,
    InputLabel,
    DialogTitle,
    FormControl,
    DialogActions,
    DialogContent,
} from '@mui/material';

import axiosInstance from 'src/utils/axios-instance';

// ----------------------------------------------------------------------
export const SimpleDialogForm = ({ onClose, onSubmit }) => {
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        item_name: '',
        manufracturer: '',
        count: 0,
        supplier_name: '',
    });

    const [suppliers, setSuppliers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    const fetchSuppliers = useCallback(async () => {
        await axiosInstance(user.token)
            .get('/supplier')
            .then((res) => setSuppliers(res.data.results))
            .catch((err) => console.log(err));
    }, [user]);

    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>Supplier Information</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Equipment Name"
                    name="item_name"
                    helperText="Supplier name is required"
                    onChange={handleChange}
                    sx={{
                        mr: 3,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Equipment Manufacturer"
                    helperText="Equipment Manufacturer is required"
                    name="manufracturer"
                    onChange={handleChange}
                    sx={{
                        mr: 3,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Count"
                    type="number"
                    name="count"
                    onChange={handleChange}
                />
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="supplier-select-label">Supplier</InputLabel>
                    <Select
                        labelId="supplier-select-label"
                        id="supplier-select"
                        value={formData.supplier}
                        label="Supplier"
                        name="supplier_name"
                        onChange={handleChange}
                    >
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.name}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

SimpleDialogForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
