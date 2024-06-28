import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import axiosInstance from 'src/utils/axios-instance';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import SalesTableRow from '../sales-table-row';
import { SimpleDialogForm } from '../sales-form';
import TableHeader from '../../common/table-header';
import TableNoData from '../../common/table-no-data';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';

// ----------------------------------------------------------------------
export default function SalesView() {
    const { user } = useSelector((state) => state.auth);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('equipment_name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [equipments, set] = useState([]);
    const [editingEquipment, setEditingEquipment] = useState({});

    const [isAdd, setisAdd] = useState(true);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEditingEquipment({});
        setOpen(false);
        setisAdd(true);
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
            const newSelecteds = equipments.map((n) => n.id);
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

    const handleSubmit = (data) => {
        axiosInstance(user.token)
            .post('sales/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                console.log(data);
                toast.success('Added');
                handleClose();
            })
            .catch(() => console.log('Failed'));

        fetchData();
    };

    const dataFiltered = applyFilter({
        inputData: equipments,
        comparator: getComparator(order, orderBy),
        filterKey: 'equipment_name',
        filterValue: filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const fetchData = useCallback(
        () =>
            axiosInstance(user.token)
                .get('sales/')
                .then((res) => {
                    set(res.data.results);
                }),
        [user]
    );

    useEffect(() => {
        fetchData();
    }, [user, fetchData]);

    return (
        <Container>
            <ToastContainer />

            {open && (
                <SimpleDialogForm
                    isAdd={isAdd}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    formData={editingEquipment}
                />
            )}

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Equipments</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleOpen}
                >
                    Add a Sale
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
                                showCheckBox={false}
                                order={order}
                                orderBy={orderBy}
                                rowCount={equipments.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    {
                                        id: 'equipment_name',
                                        label: 'Equipment Name',
                                        align: 'center',
                                    },
                                    { id: 'quantity', label: 'Quantity' },
                                    { id: 'price_per', label: 'Price Per' },
                                    { id: 'transaction_ref', label: 'Transaction Ref.' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <SalesTableRow
                                            id={row.equipment_id}
                                            key={row.equipment_id}
                                            equipment_name={row.equipment_name}
                                            quantity={row.quantity}
                                            price_per={row.price_per}
                                            transaction_ref={row.transaction_ref}
                                            selected={selected.indexOf(row.equipment_id) !== -1}
                                            showPopover
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, equipments.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={equipments.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
