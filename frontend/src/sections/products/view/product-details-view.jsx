import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import {
    Grid,
    Card,
    Table,
    Button,
    TableRow,
    CardMedia,
    Container,
    TableCell,
    Typography,
    TableContainer,
} from '@mui/material';

import { addToCart, removeFromCart } from 'src/redux/cartSlice';

import Label from 'src/components/label';

import ProductCartWidget from '../product-cart-widget';

const StatusLabel = (available) => (
    <Label
        variant="filled"
        color={available ? 'info' : 'error'}
        sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
        }}
    >
        {available ? 'Available' : 'Out of Stock'}
    </Label>
);

const ProductDescriptionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { product } = location.state || null;

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [images] = useState([product.thumbnail, ...product.pictures]);
    const [currentImage, setCurrentImage] = useState(0);

    const add = () => {
        dispatch(addToCart(product));
        toast.info('Added to cart');
    };

    const remove = (itemIdx) => {
        dispatch(removeFromCart(itemIdx));
        toast.info('Removed item from cart');
    };

    return product ? (
        <Container>
            <Typography variant="h2" sx={{ marginBottom: 4 }}>
                {product.name}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card sx={{ maxWidth: 600 }}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={images[currentImage]}
                            alt={product.name}
                            sx={{ objectFit: 'contain' }}
                        />
                        <StatusLabel
                            available={product.count}
                            sx={{ pt: '100%', position: 'relative' }}
                        />
                    </Card>
                    <Grid container sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        {images.map(
                            (image, index) =>
                                index > 0 && (
                                    <Card
                                        key={index}
                                        sx={{ width: 100, margin: '5px', cursor: 'pointer' }}
                                        onClick={() => setCurrentImage(index)}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={image}
                                            alt={product.name}
                                            sx={{ objectFit: 'contain' }}
                                            width="100%"
                                            height="100%"
                                        />
                                    </Card>
                                )
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableRow>
                                <TableCell>Equipment Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Equipment Manufracturer</TableCell>
                                <TableCell>{product.manufracturer}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Equipment Price</TableCell>
                                <TableCell>Rs. {product.price_per}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Equipment Category</TableCell>
                                <TableCell>{product.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Weight Class</TableCell>
                                <TableCell>{product.weight_class}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Equipment Availibility</TableCell>
                                <TableCell>
                                    <StatusLabel available={product.count} />
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                    {product.count && cart.some((e) => e.id === product.equipment_id) ? (
                        <>
                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={() => remove(product.equipment_id)}
                            >
                                Remove from Cart
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ mt: 2, ml: 4 }}
                                onClick={() => navigate('/checkout')}
                            >
                                Checkout
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" sx={{ mt: 2 }} onClick={add}>
                            Add to Cart
                        </Button>
                    )}
                </Grid>
            </Grid>

            <ProductCartWidget />
        </Container>
    ) : (
        <Navigate to="/404" />
    );
};

export default ProductDescriptionPage;
