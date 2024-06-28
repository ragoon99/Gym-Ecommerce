import { Link as RouterLink } from 'react-router-dom';

import { Link, Stack, Container } from '@mui/material';
import { Twitter, Facebook, Instagram, Copyright } from '@mui/icons-material';

const BasicFooter = () => (
    <Container
        sx={{
            padding: 4,
            backgroundColor: '#EEEEEE',
            color: '#747474',
        }}
        maxWidth="xl"
    >
        <Stack gap={3}>
            <Stack gap={3} direction="row" textAlign="center" justifyContent="center" fontSize={12}>
                <Link underline="none" color="inherit" component={RouterLink} to="/">
                    Home
                </Link>
                <Link underline="none" color="inherit" component={RouterLink} to="/contact">
                    Contacts
                </Link>
                <Link underline="none" color="inherit" component={RouterLink} to="/products">
                    Support
                </Link>
            </Stack>
            <Stack gap={3} direction="row" textAlign="center" justifyContent="center" fontSize={12}>
                <Instagram />
                <Facebook />
                <Twitter />
            </Stack>
            <Stack gap={3} direction="row" textAlign="center" justifyContent="center" fontSize={12}>
                <Copyright>All rights reserved.</Copyright>
            </Stack>
        </Stack>
    </Container>
);

export default BasicFooter;
