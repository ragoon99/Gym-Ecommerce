import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import axiosInstance from 'src/utils/axios-instance';

import Scrollbar from 'src/components/scrollbar';

import TableHeader from '../../common/table-header';
import TableNoData from '../../common/table-no-data';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import TransactionTableRow from '../transactions-table-row';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';

// ----------------------------------------------------------------------
export default function TransactionView() {
    const { user } = useSelector((state) => state.auth);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [suppliers, setSuppliers] = useState([]);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = suppliers.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: suppliers,
        comparator: getComparator(order, orderBy),
        filterKey: 'transaction_date',
        filterValue: filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const fetchData = useCallback(
        async () =>
            axiosInstance(user.token)
                .get('transactionlog/')
                .then((res) => setSuppliers(res.data.results))
                .catch((e) => toast.error('Failed to fetch data...')),
        [user]
    );

    useEffect(() => {
        fetchData();
    }, [user, fetchData]);

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Transactions</Typography>
            </Stack>

            <Card>
                <TableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <TableHeader
                                order={order}
                                orderBy={orderBy}
                                rowCount={suppliers.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'transaction_date', label: 'Transaction Date' },
                                    { id: 'transaction_ref', label: 'Transaction Ref' },
                                    { id: 'discount', label: 'Discount' },
                                    { id: 'total', label: 'Total' },
                                    { id: 'payment_method', label: 'Payment Method' },
                                ]}
                                showCheckBox={false}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TransactionTableRow
                                            key={row.transaction_id}
                                            selected={selected.indexOf(row.transaction_id) !== -1}
                                            transaction_date={row.transaction_date}
                                            transaction_ref={row.transaction_ref}
                                            discount={row.discount}
                                            total={row.total}
                                            payment_method={row.payment_method}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, suppliers.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={suppliers.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
