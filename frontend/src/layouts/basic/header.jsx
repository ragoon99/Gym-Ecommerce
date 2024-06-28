import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, IconButton } from '@mui/material';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';

import { HEADER } from './config-layout';
import navConfig from './config-navigation';
import AccountPopover from '../common/account-popover';
// import NotificationsPopover from '../common/notifications-popover';

function BasicHeader() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const theme = useTheme();
    const navigation = useNavigate();

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                <IconButton>
                    <Logo />
                </IconButton>

                <Stack
                    direction="row"
                    alignItems="center"
                    gap={2}
                    sx={{
                        marginLeft: 3,
                    }}
                >
                    {navConfig.map((page) => (
                        <Button
                            key={page.title}
                            onClick={() => navigation(page.path)}
                            sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                            {page.title}
                        </Button>
                    ))}
                </Stack>

                <Box sx={{ flexGrow: 1 }} />

                {user && isAuthenticated ? (
                    <Stack direction="row" alignItems="center" spacing={4}>
                        {user.is_superuser && (
                            <Button variant="outlined" onClick={() => navigation('dashboard')}>
                                Dashboard
                            </Button>
                        )}
                        {/* <NotificationsPopover /> */}
                        <AccountPopover />
                    </Stack>
                ) : (
                    <Button variant="outlined" onClick={() => navigation('login')}>
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default BasicHeader;
