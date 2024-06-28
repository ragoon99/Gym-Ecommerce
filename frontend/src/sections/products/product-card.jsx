import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { AddShoppingCart, RemoveShoppingCart } from '@mui/icons-material';
import { Button, CardMedia, CardActions, CardContent, CardActionArea } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { addToCart, removeFromCart } from 'src/redux/cartSlice';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

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

export default function ShopProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const add = () => {
        dispatch(addToCart(product));
        toast.info('Added to cart');
    };

    const remove = (itemIdx) => {
        dispatch(removeFromCart(itemIdx));
        toast.info('Removed item from cart');
    };

    const renderPrice = (
        <Typography variant="subtitle1">Rs. {fCurrency(product.price_per)}</Typography>
    );

    const showProduct = () => navigate('/product-detail', { state: { product } });

    return (
        // <Card>
        //     <CardActionArea disableRipple onClick={showProduct}>
        //         <Box sx={{ pt: '100%', position: 'relative' }}>
        //             <StatusLabel available={product.available} />
        //             {renderImg}
        //         </Box>

        //         <Stack spacing={2} sx={{ p: 3 }}>
        //             <Stack direction="row" justifyContent="space-between">
        //                 <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
        //                     {product.name}
        //                 </Link>
        //             </Stack>

        //             <Stack direction="row" alignItems="center" justifyContent="space-between">
        //                 {/* <ColorPreview colors={product.colors} /> */}
        //                 {renderPrice}
        //             </Stack>
        //         </Stack>
        //     </CardActionArea>
        //     <CardActions>
        //         {cart.some((item) => item.id === product.equipment_id) ? (
        //             <RemoveShoppingCart
        //                 id={product.equipme_id}
        //                 onClick={() => remove(product.equipment_id)}
        //                 cursor="pointer"
        //             />
        //         ) : (
        //             <AddShoppingCart id={product.equipment_id} onClick={add} cursor="pointer" />
        //         )}
        //     </CardActions>
        // </Card>
        <Card>
            <CardActionArea disableRipple onClick={showProduct}>
                <StatusLabel
                    available={product.available}
                    sx={{ pt: '100%', position: 'relative' }}
                />
                <CardMedia
                    component="img"
                    height="140"
                    image={product.thumbnail}
                    alt={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {renderPrice}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button size="small" color="primary" onClick={showProduct}>
                    See More
                </Button>
                {cart.some((item) => item.id === product.equipment_id) ? (
                    <RemoveShoppingCart
                        id={product.equipme_id}
                        onClick={() => remove(product.equipment_id)}
                        cursor="pointer"
                    />
                ) : (
                    <AddShoppingCart id={product.equipment_id} onClick={add} cursor="pointer" />
                )}
            </CardActions>
        </Card>
    );
}

ShopProductCard.propTypes = {
    product: PropTypes.object,
};
