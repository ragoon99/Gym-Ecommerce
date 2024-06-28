import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';

import {
    Dialog,
    Button,
    Select,
    MenuItem,
    TextField,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@mui/material';

import axiosInstance from 'src/utils/axios-instance';

// ----------------------------------------------------------------------
export const SimpleDialogForm = ({ isAdd, formData = {}, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [equipments, setEquipments] = useState([]);

    const handleClose = () => {
        onClose();
    };

    const handleFormSubmit = (data) => {
        // onSubmit(data);
        console.log(data);
    };

    const fetchData = useCallback(() => {
        axiosInstance()
            .get('equipment/')
            .then((res) => {
                console.log(res.data.results);
                setEquipments(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>Equipment Information</DialogTitle>
            <DialogContent>
                <Select
                    id="equipment-select"
                    variant="outlined"
                    placeholder="Select Equipment"
                    {...register('equipment')}
                    error={!!errors.equipment}
                    helperText={errors.equipment?.message}
                    fullWidth
                >
                    {equipments.map((equipment) => (
                        <MenuItem key={equipment.equipment_id} value={equipment.equipment_id}>
                            {equipment.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    margin="dense"
                    label="Quantity"
                    {...register('quantity', { required: true })}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    sx={{
                        mr: 3,
                    }}
                    defaultValue={formData.quantity || ''}
                />
                <TextField
                    margin="dense"
                    type="number"
                    label="Price Per."
                    {...register('price_per', { required: true })}
                    error={!!errors.price_per}
                    helperText={errors.price_per?.message}
                    defaultValue={formData.price_per || ''}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" onClick={handleSubmit(handleFormSubmit)}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

SimpleDialogForm.propTypes = {
    isAdd: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    formData: PropTypes.any,
};
