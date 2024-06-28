import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import axiosInstance from 'src/utils/axios-instance';

import { bgGradient } from 'src/theme/css';
// import { useAuth } from 'src/context/AuthUser';

import { useNavigate } from 'react-router-dom';

import { login } from 'src/redux/authSlice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const theme = useTheme();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = () =>
        axiosInstance()
            .post('accounts/login/', {
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                dispatch(login(res.data));
                navigation('/');
            })
            .catch(() => toast.error('Failed to Login'));

    const renderForm = (
        <>
            <Stack spacing={3}>
                <ToastContainer />

                <TextField name="username" label="Username" onChange={handleChange} required />

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    <Iconify
                                        icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    required
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleLogin}
            >
                Login
            </LoadingButton>

            <Typography
                marginTop={2}
                textAlign="center"
                onClick={() => navigation('/signup')}
                color="blue"
                sx={{
                    cursor: 'pointer',
                }}
            >
                Register
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
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Sign in
                    </Typography>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
