import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import {
    Dialog,
    Button,
    TextField,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@mui/material';

// ----------------------------------------------------------------------
export const SimpleDialogForm = ({ isAdd, formData = {}, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleClose = () => {
        onClose();
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>Supplier Information</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Supplier Name"
                    {...register('name', { required: true })}
                    error={!!errors.name}
                    helperText={errors.name?.message || 'Supplier name is required'}
                    sx={{
                        mr: 3,
                    }}
                    defaultValue={formData.name || ''}
                />
                <TextField
                    margin="dense"
                    label="Address"
                    {...register('address', { required: true })}
                    error={!!errors.address}
                    helperText={errors.address?.message || 'Address is required'}
                    sx={{
                        mr: 3,
                    }}
                    defaultValue={formData.address || ''}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    {...register('email', {
                        required: true,
                        pattern:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message || 'Invalid email format'}
                    defaultValue={formData.email || ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Phone Number"
                    fullWidth
                    {...register('contact_info', { required: true })}
                    error={!!errors.contact_info}
                    helperText={errors.contact_info?.message || 'Phone Number is Required'}
                    defaultValue={formData.contact_info || ''}
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
