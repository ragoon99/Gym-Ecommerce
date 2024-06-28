import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Card,
    Grid,
    Stack,
    Button,
    CardMedia,
    Container,
    Typography,
    CardContent,
} from '@mui/material';

function HomepageView() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom>
                        Introducing the All-New [Your Product Category]
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis
                        unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                        et quasi architecto beatae vitae dicta sunt explicabo.
                    </Typography>
                    <Button variant="contained" size="large" onClick={() => navigate('/products')}>
                        Shop Now
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            component="img"
                            image="https://source.unsplash.com/hero?ecommerce"
                            alt="Hero Image"
                            sx={{ width: '100%' }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h5" gutterBottom>
                                    Limited Time Offer!
                                </Typography>
                                <Typography variant="body1">
                                    Get [discount]% off your first purchase.
                                </Typography>
                                <Button variant="outlined" size="small">
                                    Learn More
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* <Grid container spacing={3} sx={{ marginTop: 4 }}>
                {equipments.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardMedia component="img" image={product.image} alt={product.title} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="body1">${product.price}</Typography>
                                    <Button variant="contained" size="small">
                                        Add to Cart
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid> */}
        </Container>
    );
}

export default HomepageView;
