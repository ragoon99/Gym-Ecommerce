import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Card,
    alpha,
    Stack,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
} from '@mui/material';

import axiosInstance from 'src/utils/axios-instance';

import { bgGradient } from 'src/theme/css';

function SignUpView() {
    const navigation = useNavigate();

    const theme = useTheme();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        dob: '',
        address: '',
        password: '',
        password2: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (data) =>
        axiosInstance()
            .post('accounts/users/', formData)
            .then(() => {
                navigation('/login');
            })
            .catch((err) => {
                setErrors(err.response.data);
                toast.error('Failed to Register');
                console.log(err);
            });

    const renderForm = (
        <>
            <Stack direction="column" justifyContent="space-around" alignContent="space-around">
                <Stack direction="row" justifyContent="space-around">
                    <TextField
                        label="First Name"
                        name="fist_name"
                        error={!!errors.first_name}
                        helperText={errors.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        error={!!errors.last_name}
                        helperText={errors.last_name}
                        onChange={handleChange}
                    />
                </Stack>
                <Stack direction="row" justifyContent="space-around">
                    <TextField
                        margin="dense"
                        label="Username"
                        name="username"
                        error={!!errors.username}
                        onChange={handleChange}
                        helperText={errors.username}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Stack>
                <TextField
                    margin="dense"
                    label="Phone Number"
                    name="phone_number"
                    inputProps={{ maxLength: 10 }}
                    onChange={handleChange}
                    error={!!errors.phone_number}
                    helperText={errors.phone_number}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    name="dob"
                    error={!!errors.dob}
                    helperText={errors.dob}
                    sx={{
                        mr: 2,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Address"
                    name="address"
                    error={!!errors.address}
                    onChange={handleChange}
                    helperText={errors.address}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password2"
                    onChange={handleChange}
                    error={!!errors.password2}
                    helperText={errors.password2}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    fullWidth
                />
            </Stack>
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleSubmit}
                sx={{ my: 3 }}
            >
                Sign Up
            </LoadingButton>

            <Typography
                marginTop={2}
                textAlign="center"
                onClick={() => navigation('/login')}
                color="blue"
                sx={{
                    cursor: 'pointer',
                }}
            >
                Login
            </Typography>
            <Typography
                marginTop={2}
                textAlign="center"
                onClick={() => navigation('/')}
                color="blue"
                sx={{
                    cursor: 'pointer',
                }}
            >
                Back to Homepage
            </Typography>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <ToastContainer />
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 560,
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Sign Up
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}

export default SignUpView;
