import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Dialog,
    Select,
    Button,
    MenuItem,
    TextField,
    InputLabel,
    IconButton,
    DialogTitle,
    FormControl,
    DialogActions,
    DialogContent,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';

// ----------------------------------------------------------------------
const roles = {
    s_manager: 'Sales Manager',
    receptionist: 'Receptionist',
    manager: 'Manager',
    client: 'Client',
};

export const SimpleDialogForm = ({ isAdd, formData = {}, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const handleClose = () => {
        onClose();
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const invertedRoles = {
        ...Object.entries(roles).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {}),
    };

    const getRoleKey = (value) => invertedRoles[value];

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>User Information</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="First Name"
                    {...register('first_name', { required: true })}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message || 'First name is required'}
                    sx={{
                        mr: 3,
                    }}
                    defaultValue={formData.first_name || ''}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    {...register('last_name', { required: true })}
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message || 'Last name is required'}
                    defaultValue={formData.last_name || ''}
                />
                <TextField
                    margin="dense"
                    label="Username"
                    {...register('username', { required: true })}
                    error={!!errors.username}
                    helperText={errors.username?.message || 'Username is required'}
                    sx={{
                        mr: 3,
                    }}
                    defaultValue={formData.username || ''}
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
                    {...register('phone_number')}
                    error={!!errors.phone_number}
                    helperText={errors.phone_number?.message || ''}
                    defaultValue={formData.phone_number || ''}
                />
                {isAdd && (
                    <FormControl fullWidth margin="dense" variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: true })}
                            error={!!errors.password}
                            helperText={errors.password?.message || 'Password is required'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                )}
                <TextField
                    margin="dense"
                    label="Date of Birth"
                    fullWidth
                    type="date"
                    {...register('dob')}
                    InputLabelProps={{ shrink: true }}
                    defaultValue={formData.dob || ''}
                />
                <TextField
                    margin="dense"
                    label="Address"
                    fullWidth
                    {...register('address')}
                    defaultValue={formData.address || ''}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                        labelId="role-select-label"
                        {...register('role', { required: true })}
                        error={!!errors.role}
                        helperText={errors.role?.message || 'Role is required'}
                        label="Role"
                        defaultValue={getRoleKey(formData.role) || ''}
                    >
                        {Object.entries(roles).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
