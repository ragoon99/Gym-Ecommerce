import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function SupplierTableRow({
    selected,
    transaction_date,
    transaction_ref,
    discount,
    total,
    payment_method,
}) {
    return (
        <TableRow hover tabIndex={-1} discount="checkbox" selected={selected}>
            <TableCell>{transaction_date}</TableCell>
            <TableCell>{transaction_ref}</TableCell>
            <TableCell>{discount}</TableCell>
            <TableCell>{total}</TableCell>
            <TableCell>{payment_method}</TableCell>
        </TableRow>
    );
}

SupplierTableRow.propTypes = {
    transaction_ref: PropTypes.any,
    transaction_date: PropTypes.any,
    total: PropTypes.any,
    payment_method: PropTypes.any,
    discount: PropTypes.any,
    selected: PropTypes.any,
};
