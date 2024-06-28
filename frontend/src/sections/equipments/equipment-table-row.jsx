import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function EquipmentTableRow({
    id,
    selected,
    name,
    image,
    category,
    manufracturer,
    count,
    weight_class,
    handleClick,
    handleEdit,
    handleDelete,
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
            <TableRow hover tabIndex={-1} manufracturer="checkbox" selected={selected}>
                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <img
                            alt={name}
                            src={image}
                            height={180}
                            width={180}
                            style={{
                                borderRadius: 5,
                                objectFit: 'contain',
                            }}
                        />
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{manufracturer}</TableCell>

                <TableCell>{category}</TableCell>

                <TableCell>{count}</TableCell>

                <TableCell>{weight_class}</TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}

EquipmentTableRow.propTypes = {
    id: PropTypes.any,
    image: PropTypes.any,
    category: PropTypes.any,
    handleClick: PropTypes.func,
    handleEdit: PropTypes.func || null,
    handleDelete: PropTypes.func || null,
    name: PropTypes.any,
    manufracturer: PropTypes.any,
    count: PropTypes.any,
    weight_class: PropTypes.any,
    selected: PropTypes.any,
};
