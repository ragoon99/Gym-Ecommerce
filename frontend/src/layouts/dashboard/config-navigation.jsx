import {
    Feed,
    CurrencyExchange,
    ReceiptLongRounded,
    ShoppingCartRounded,
    FitnessCenterRounded,
    AccountCircleRounded,
    ShoppingCartCheckout,
    LocalShippingRounded,
} from '@mui/icons-material';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
    {
        title: 'dashboard',
        path: '/dashboard',
        icon: icon('ic_analytics'),
    },
    {
        title: 'user',
        path: '/user',
        icon: icon('ic_user'),
    },
    {
        title: 'equipments',
        path: '/equipments',
        icon: <FitnessCenterRounded />,
    },
    {
        title: 'transcations',
        path: '/transactions',
        icon: <CurrencyExchange />,
    },
    {
        title: 'bills',
        path: '/billings',
        icon: <ReceiptLongRounded />,
    },
    {
        title: 'orders',
        path: '/orders',
        icon: <ShoppingCartRounded />,
    },
    {
        title: 'suppliers',
        path: '/suppliers',
        icon: <LocalShippingRounded />,
    },
    {
        title: 'sales',
        path: '/sales',
        icon: <ShoppingCartCheckout />,
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <AccountCircleRounded />,
    },
    {
        title: 'Feedbacks',
        path: '/feedbacks',
        icon: <Feed />,
    },
];

export default navConfig;
