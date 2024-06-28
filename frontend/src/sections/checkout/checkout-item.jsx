import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Add, Delete, Remove } from '@mui/icons-material';
import { Box, Stack, IconButton, Typography } from '@mui/material';

import { decreaseQty, increaseQty, removeFromCart } from 'src/redux/cartSlice';

const CartCard = ({ item }) => {
    const dispatch = useDispatch();

    const remove = (itemIdx) => {
        dispatch(removeFromCart(itemIdx));
        toast.error('Removed item from cart');
    };

    const increase = (id) => {
        dispatch(increaseQty(id));
    };

    const decrease = (id) => {
        if (item.qty === 1) {
            dispatch(removeFromCart(id));
        } else dispatch(decreaseQty(id));
    };

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <img
                alt={item.name}
                src={item.thumbnail}
                height={180}
                width={180}
                style={{
                    borderRadius: 5,
                    objectFit: 'contain',
                }}
            />
            <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="stretch"
                spacing={3}
            >
                <Box>
                    <Typography>Name</Typography>
                    <Typography variant="h4">{item.name}</Typography>
                </Box>
                <Box>
                    <Typography>Quantity</Typography>
                    <Typography variant="h5">{item.qty}</Typography>
                </Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                >
                    <IconButton onClick={() => increase(item.id)}>
                        <Add />
                    </IconButton>
                    <IconButton onClick={() => decrease(item.id)}>
                        <Remove />
                    </IconButton>
                    <IconButton onClick={() => remove(item.id)}>
                        <Delete />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    );
};

CartCard.propTypes = {
    item: PropTypes.object,
};

export default CartCard;
