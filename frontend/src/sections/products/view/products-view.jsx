import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';

import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import axiosInstance from 'src/utils/axios-instance';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
    const { user } = useSelector((state) => state.auth);

    const [openFilter, setOpenFilter] = useState(false);

    const [products, setProducts] = useState([]);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const fetchData = useCallback(
        () =>
            axiosInstance()
                .get('equipment/')
                .then((res) => {
                    setProducts(res.data.results);
                }),
        []
    );

    useEffect(() => {
        fetchData();
    }, [user, fetchData]);

    return (
        <Container>
            <ToastContainer />
            <Typography variant="h4" sx={{ mb: 5 }}>
                Products
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilters
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                    />

                    <ProductSort />
                </Stack>
            </Stack>

            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item key={product.equipment_id} xs={12} sm={6} md={3}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>

            <ProductCartWidget />
        </Container>
    );
}
