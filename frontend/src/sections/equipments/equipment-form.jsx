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
            <DialogTitle>Equipment Information</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Equipment Name"
                    {...register('name', { required: true })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{
                        mr: 3,
                    }}
                    defaultValue={formData.name || ''}
                />
                <TextField
                    margin="dense"
                    label="Manufracturer"
                    {...register('manufracturer', { required: true })}
                    error={!!errors.manufracturer}
                    helperText={errors.manufracturer?.message}
                    defaultValue={formData.manufracturer || ''}
                />
                <TextField
                    margin="dense"
                    label="Category"
                    {...register('category')}
                    sx={{
                        mr: 3,
                    }}
                    error={!!errors.category}
                    helperText={errors.category?.message || ''}
                    defaultValue={formData.category || ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Count"
                    type="number"
                    {...register('count', { required: true })}
                    error={!!errors.count}
                    helperText={errors.count?.message}
                    defaultValue={formData.count || ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Weight Class"
                    type="number"
                    {...register('weight_class', { required: true })}
                    sx={{
                        mr: 3,
                    }}
                    error={!!errors.weight_class}
                    helperText={errors.weight_class?.message}
                    defaultValue={formData.weight_class || ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Price Per"
                    type="number"
                    {...register('price_per', { required: true })}
                    error={!!errors.price_per}
                    helperText={errors.price_per?.message}
                    defaultValue={formData.price_per || ''}
                />
                <TextField
                    type="file"
                    label="Equipment Image"
                    margin="dense"
                    {...register('image')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        multiple: true,
                    }}
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
