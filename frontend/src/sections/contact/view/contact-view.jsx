/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import { Grid, Stack, Button, Container, TextField, Typography } from '@mui/material';

import axiosInstance from 'src/utils/axios-instance';

function ContactView() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        await axiosInstance()
            .post('/feedback/', data)
            .then((res) => {
                toast.success('Submitted Successfully');
            })
            .catch((err) => {
                toast.err('An Error Occured');
            });
    };
    return (
        <Container maxWidth="lg">
            <ToastContainer />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Contact Us
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" paragraph>
                        Feel free to reach out using the form below. We'll get back to you as soon
                        as possible.
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField
                                {...register('name', { required: true, maxLength: 80 })}
                                label="Name"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                            <TextField
                                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                label="Email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message || 'Invalid email format'}
                            />
                            <TextField
                                {...register('message', { required: true })}
                                label="Message"
                                multiline
                                rows={4}
                                fullWidth
                                error={!!errors.message}
                                helperText={errors.message?.message || 'Please enter a message'}
                            />
                            <Button variant="contained" type="submit">
                                Send Message
                            </Button>
                        </Stack>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Other Contact Options
                    </Typography>
                    <Stack spacing={1}>
                        <Typography variant="body1">Email: info@youremail.com</Typography>
                        <Typography variant="body1">Phone: (555) 555-5555</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ContactView;
