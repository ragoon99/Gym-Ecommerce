import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function SalesTableRow({
    id,
    selected,
    equipment_name,
    quantity,
    price_per,
    transaction_ref,
}) {
    return (
        <TableRow hover tabIndex={-1} quantity="checkbox" selected={selected}>
            <TableCell align="center">{equipment_name}</TableCell>

            <TableCell>{quantity}</TableCell>

            <TableCell>{price_per}</TableCell>

            <TableCell>{transaction_ref}</TableCell>
        </TableRow>
    );
}

SalesTableRow.propTypes = {
    id: PropTypes.any,
    price_per: PropTypes.any,
    quantity: PropTypes.any,
    equipment_name: PropTypes.any,
    transaction_ref: PropTypes.any,
    selected: PropTypes.any,
};
