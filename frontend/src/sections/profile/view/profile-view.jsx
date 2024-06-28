import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import {
    Stack,
    Button,
    Divider,
    TextField,
    Container,
    Typography,
    FormControl,
} from '@mui/material';

import axiosInstance from 'src/utils/axios-instance';

export default function ProfileView() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const formSubmit = (data) => {
        axiosInstance(user.token)
            .patch(`accounts/users/${user.id}/`, data)
            .then((e) => {
                console.log('Updated');
                toast.success('Details Updated');
            })
            .catch((e) => {
                console.log(`Failed : ${e}`);
                toast.error('Failed to Update');
            });
    };

    console.log(isAuthenticated);

    return isAuthenticated ? (
        <Container>
            <ToastContainer />
            <FormControl>
                <Stack gap={3}>
                    <Typography variant="h3">User Profile</Typography>
                    <Divider />
                    <Stack direction="row" gap={4}>
                        <TextField
                            id="first_name"
                            size="small"
                            label="First Name"
                            {...register('first_name', { required: true })}
                            helperText={errors.first_name?.message}
                            defaultValue={user.first_name}
                        />
                        <TextField
                            id="last_name"
                            size="small"
                            label="Last Name"
                            {...register('last_name', { required: true })}
                            helperText={errors.last_name?.message}
                            defaultValue={user.last_name}
                        />
                    </Stack>
                    <TextField
                        id="username"
                        size="small"
                        label="Username"
                        {...register('username', { required: true })}
                        helperText={errors.username?.message}
                        defaultValue={user.username}
                    />
                    <TextField
                        id="email"
                        size="small"
                        label="Email"
                        type="email"
                        {...register('email', { required: true })}
                        helperText={errors.email?.message}
                        defaultValue={user.email}
                    />
                    <TextField
                        id="phone_number"
                        size="small"
                        label="Phone Number"
                        {...register('phone_number', { required: true })}
                        helperText={errors.phone_number?.message}
                        defaultValue={user.phone_number}
                    />
                    <TextField
                        id="address"
                        size="small"
                        label="Address"
                        {...register('address', { required: true })}
                        helperText={errors.address?.message}
                        defaultValue={user.address}
                    />
                    <TextField
                        id="dob"
                        size="small"
                        label="Date of Birth"
                        type="date"
                        {...register('dob', { required: true })}
                        helperText={errors.dob?.message}
                        defaultValue={user.dob}
                    />

                    <Button onClick={handleSubmit(formSubmit)}>Save</Button>
                </Stack>
            </FormControl>
        </Container>
    ) : (
        <Navigate to="/" replace />
    );
}
