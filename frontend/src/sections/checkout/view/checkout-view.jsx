/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Card, Stack, Button, Divider } from '@mui/material';

import axiosInstance from 'src/utils/axios-instance';

import { clearCart } from 'src/redux/cartSlice';

import CartCard from '../checkout-item';

// ----------------------------------------------------------------------

export default function CheckoutView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [total, setTotal] = useState(0);

    const checkout = async () => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
            const payload = [...cart, total];
            toast.info('Pending Request...');
            await axiosInstance(user.token)
                .post('payment/', payload)
                .then((res) => {
                    const { data } = res;
                    window.location.href = data.payment_url;
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch(clearCart());
            localStorage.removeItem('localCart');
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + curr.price_per * curr.qty, 0));
    }, [cart]);

    return (
        <Container>
            <ToastContainer />
            {cart.length === 0 ? (
                <Container maxWidth>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography textAlign="center" variant="h1">
                            Cart is Empty
                        </Typography>
                        <Button variant="contained" onClick={() => navigate('/products')}>
                            Shop Now
                        </Button>
                    </Stack>
                </Container>
            ) : (
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                >
                    <Stack direction="column" gap={2}>
                        {cart.map((item) => (
                            <Card
                                variant="outlined"
                                sx={{
                                    width: '500px',
                                    paddingX: '16px',
                                    paddingY: '8px',
                                }}
                            >
                                <CartCard key={item.id} item={item} />
                            </Card>
                        ))}
                    </Stack>
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 0,
                        }}
                    >
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={3}
                            sx={{
                                position: 'sticky',
                            }}
                        >
                            <Typography variant="h4">
                                Total Items in Cart : {cart.length}
                            </Typography>
                            <Typography variant="h4">Total Price : Rs. {total}</Typography>
                            <Button variant="contained" onClick={checkout}>
                                Check Out
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            )}
        </Container>
    );
}
