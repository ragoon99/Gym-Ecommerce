import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import axiosInstance from 'src/utils/axios-instance';

import { logout } from 'src/redux/authSlice';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: 'eva:home-fill',
        link: '/',
        slug: 'home',
    },
    {
        label: 'Profile',
        icon: 'eva:person-fill',
        link: 'profile',
        slug: 'profile',
    },
    {
        label: 'Purchase History',
        icon: 'eva:person-fill',
        link: 'purchase-history',
        slug: 'purchase-history',
    },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(null);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await axiosInstance(user.token)
            .post('accounts/logout/')
            .then(() => {
                dispatch(logout());
                navigate('/');
            })
            .catch((e) => console.log(e));
    };

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    width: 40,
                    height: 40,
                    background: (theme) => alpha(theme.palette.grey[500], 0.08),
                    ...(open && {
                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    }),
                }}
            >
                <Avatar
                    src={user.photo}
                    alt={user.full_name}
                    sx={{
                        width: 36,
                        height: 36,
                        border: (theme) => `solid 2px ${theme.palette.background.default}`,
                    }}
                >
                    {user.full_name.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1,
                        ml: 0.75,
                        width: 200,
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2 }}>
                    <Typography variant="subtitle2" noWrap>
                        {user.full_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {user.email}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {MENU_OPTIONS.map((option) =>
                    // Conditionally render Purchase History only for Client users
                    user.role === 'client' && option.slug === 'purchase-history' ? (
                        <MenuItem key={option.label} onClick={() => navigate(option.link)}>
                            {option.label}
                        </MenuItem>
                    ) : (
                        option.slug !== 'purchase-history' && (
                            <MenuItem key={option.label} onClick={() => navigate(option.link)}>
                                {option.label}
                            </MenuItem>
                        )
                    )
                )}

                <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

                <MenuItem
                    disableRipple
                    disableTouchRipple
                    onClick={handleLogout}
                    sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
                >
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
