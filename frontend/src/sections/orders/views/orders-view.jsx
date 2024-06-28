import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import axiosInstance from 'src/utils/axios-instance';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import OrdersTableRow from '../orders-table-row';
import { SimpleDialogForm } from '../orders-form';
import TableHeader from '../../common/table-header';
import TableNoData from '../../common/table-no-data';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';

// ----------------------------------------------------------------------
export default function OrderView() {
    const { user } = useSelector((state) => state.auth);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [orderHistory, setOrderHistory] = useState([]);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = orderHistory.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);

        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
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

    const handleDelivery = async (event, id) => {
        await axiosInstance(user.token)
            .patch(`/orderhistory/${id}/order-status/`)
            .then((res) => toast.success('Order Set'))
            .catch((err) => {
                console.log(err);
                toast.error('Failed to set order');
            });
        fetchData();
    };

    const handleSubmit = async (data) => {
        await axiosInstance(user.token)
            .post('/orderhistory/', data)
            .then((res) => toast.success('Order Set'))
            .catch((err) => {
                console.log(err);
                toast.error('Failed to set order');
            });
        fetchData();
    };

    const dataFiltered = applyFilter({
        inputData: orderHistory,
        comparator: getComparator(order, orderBy),
        filterKey: 'date',
        filterValue: filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const fetchData = useCallback(
        async () =>
            axiosInstance(user.token)
                .get('orderhistory/')
                .then((res) => {
                    setOrderHistory(res.data.results);
                })
                .catch((e) => toast.error('Failed to fetch data...')),
        [user]
    );

    useEffect(() => {
        fetchData();
    }, [user, fetchData]);

    return (
        <Container>
            <ToastContainer />

            {open && <SimpleDialogForm onClose={handleClose} onSubmit={handleSubmit} />}

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Orders</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleOpen}
                >
                    Set New Order
                </Button>
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
                                rowCount={orderHistory.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'order_date', label: 'Date' },
                                    { id: 'item_name', label: 'Item' },
                                    { id: 'supplier_name', label: 'Supplier' },
                                    { id: 'count', label: 'Count' },
                                    { id: 'status', label: 'Status', align: 'center' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <OrdersTableRow
                                            key={row.order_id}
                                            selected={selected.indexOf(row.order_id) !== -1}
                                            order_date={row.order_date}
                                            item_name={row.item_name}
                                            supplier_name={row.supplier_name}
                                            count={row.count}
                                            status={row.status}
                                            handleClick={(event) =>
                                                handleClick(event, row.order_id)
                                            }
                                            handleDelivery={(event) =>
                                                handleDelivery(event, row.order_id)
                                            }
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, orderHistory.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={orderHistory.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
