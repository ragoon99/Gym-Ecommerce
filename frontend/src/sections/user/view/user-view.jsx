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

import UserTableRow from '../user-table-row';
import { SimpleDialogForm } from '../user-form';
import TableHeader from '../../common/table-header';
import TableNoData from '../../common/table-no-data';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';

// ----------------------------------------------------------------------
export default function UserPage() {
    const { user } = useSelector((state) => state.auth);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState({});

    const [isAdd, setisAdd] = useState(true);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEditingUser({});
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
            const newSelecteds = users.map((n) => n.id);
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

    const handleSubmit = (data) => {
        console.log(data);
        if (isAdd) {
            axiosInstance(user.token)
                .post('accounts/users/', data)
                .then(() => {
                    fetchData();
                    toast.success('User Added');
                    handleClose();
                })
                .catch((e) => toast.error('Failed to add supplier'));
        } else {
            axiosInstance(user.token)
                .patch(`accounts/users/${editingUser.id}/`, data)
                .then(() => {
                    fetchData();
                    toast.success('Edit Success');
                    handleClose();
                })
                .catch((e) => toast.error('Failed to update data'));
        }
    };

    const handleEdit = (event, id) => {
        const userData = users.filter((data) => data.id === id)[0];

        setEditingUser(userData);
        setOpen(true);
        setisAdd(false);
    };

    const handleDelete = (event, id) => {
        axiosInstance(user.token)
            .delete(`accounts/users/${id}/`)
            .then(() => {
                fetchData();
                toast.success('Delete Success');
            })
            .catch((err) => toast.error('Failed to delete data'));
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterKey: 'full_name',
        filterValue: filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const fetchData = useCallback(
        () =>
            axiosInstance(user.token)
                .get('accounts/users/')
                .then((res) => {
                    const data = res.data.filter(
                        (userData) => userData.is_superuser !== true || userData.id !== user.id
                    );

                    setUsers(data);
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

            {open && (
                <SimpleDialogForm
                    isAdd={isAdd}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                    formData={editingUser}
                />
            )}

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Users</Typography>

                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleOpen}
                >
                    New User
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
                                rowCount={users.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'name', label: 'Name' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'role', label: 'Role' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <UserTableRow
                                            id={row.id}
                                            key={row.id}
                                            name={row.full_name}
                                            role={row.role}
                                            email={row.email}
                                            avatarUrl={row.profileURL}
                                            selected={selected.indexOf(row.id) !== -1}
                                            handleClick={(event) => handleClick(event, row.id)}
                                            handleEdit={(event) => handleEdit(event, row.id)}
                                            handleDelete={(event) => handleDelete(event, row.id)}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
