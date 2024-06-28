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

import { SimpleDialogForm } from '../supplier-form';
import TableHeader from '../../common/table-header';
import TableNoData from '../../common/table-no-data';
import SupplierTableRow from '../supplier-table-row';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';

// ----------------------------------------------------------------------
export default function SupplierView() {
    const { user } = useSelector((state) => state.auth);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState({});

    const [isAdd, setisAdd] = useState(true);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEditingSupplier({});
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
            const newSelecteds = suppliers.map((n) => n.id);
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

    const handleSubmit = async (data) => {
        if (isAdd) {
            axiosInstance(user.token)
                .post('supplier/', data)
                .then(() => {
                    fetchData();
                    toast.success('Supplier Added');
                    handleClose();
                })
                .catch((e) => toast.error('Failed to add supplier'));
        } else {
            axiosInstance(user.token)
                .patch(`supplier/${editingSupplier.supplier_id}/`, data)
                .then(() => {
                    fetchData();
                    toast.success('Edit Success');
                    handleClose();
                })
                .catch((e) => toast.error('Failed to update data'));
        }
    };

    const handleEdit = async (event, id) => {
        const userData = suppliers.filter((data) => data.supplier_id === id)[0];

        setEditingSupplier(userData);
        setOpen(true);
        setisAdd(false);
    };

    const handleDelete = async (event, id) => {
        axiosInstance(user.token)
            .delete(`supplier/${id}/`)
            .then(() => {
                fetchData();
                toast.success('Delete Success');
            })
            .catch((err) => toast.error('Failed to delete data'));
    };

    const dataFiltered = applyFilter({
        inputData: suppliers,
        comparator: getComparator(order, orderBy),
        filterKey: 'name',
        filterValue: filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const fetchData = useCallback(
        async () =>
            axiosInstance(user.token)
                .get('supplier/')
                .then((res) => setSuppliers(res.data.results))
                .catch((e) => toast.error('Failed to fetch data...')),
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
                    formData={editingSupplier}
                />
            )}

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Suppliers</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleOpen}
                >
                    New Supplier
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
                                rowCount={suppliers.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'name', label: 'Name' },
                                    { id: 'contact_info', label: 'Contact Info' },
                                    { id: 'address', label: 'Address' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <SupplierTableRow
                                            key={row.supplier_id}
                                            selected={selected.indexOf(row.supplier_id) !== -1}
                                            name={row.name}
                                            contact_info={row.contact_info}
                                            address={row.address}
                                            handleClick={(event) =>
                                                handleClick(event, row.supplier_id)
                                            }
                                            handleEdit={(event) =>
                                                handleEdit(event, row.supplier_id)
                                            }
                                            handleDelete={(event) =>
                                                handleDelete(event, row.supplier_id)
                                            }
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
