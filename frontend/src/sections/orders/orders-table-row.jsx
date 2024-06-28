import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function OrdersTableRow({
    selected,
    order_date,
    item_name,
    supplier_name,
    count,
    status,
    handleClick,
    handleDelivery,
}) {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    return (
        <>
            <TableRow hover tabIndex={-1} supplier_name="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick} />
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Typography variant="subtitle2">{order_date}</Typography>
                </TableCell>

                <TableCell>{item_name}</TableCell>

                <TableCell>{supplier_name}</TableCell>

                <TableCell>{count}</TableCell>

                <TableCell align="center">
                    <Label color={status === 'Delivered' ? 'success' : 'error'}>
                        {status === 'Delivered' ? 'Delivered' : 'Not Delivered'}
                    </Label>
                </TableCell>

                {status !== 'Delivered' && (
                    <TableCell align="right">
                        <IconButton onClick={handleOpenMenu}>
                            <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                    </TableCell>
                )}
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 180 },
                }}
            >
                <MenuItem onClick={handleDelivery} sx={{ color: 'green' }}>
                    <Iconify icon="streamline:shipping-box-1" sx={{ mr: 2 }} />
                    Set Delivered
                </MenuItem>
            </Popover>
        </>
    );
}

OrdersTableRow.propTypes = {
    item_name: PropTypes.any,
    handleClick: PropTypes.func,
    handleDelivery: PropTypes.func || null,
    order_date: PropTypes.any,
    supplier_name: PropTypes.any,
    count: PropTypes.any,
    status: 'Delivered' || 'Not Delivered',
    selected: PropTypes.any,
};
