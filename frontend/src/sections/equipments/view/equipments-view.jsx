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

import TableHeader from '../../common/table-header';
import CustomTableRow from '../equipment-table-row';
import { SimpleDialogForm } from '../equipment-form';
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
        if (isAdd) {
            axiosInstance(user.token)
                .post('equipment/', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(() => {
                    console.log(data);
                    toast.success('Equipment Added');
                    handleClose();
                })
                .catch(() => console.log('Failed'));
        } else {
            axiosInstance(user.token)
                .patch(`equipment/${editingEquipment.equipment_id}/`, data)
                .then(() => {
                    toast.success('Edit Success');
                    handleClose();
                })
                .catch((e) => {
                    toast.error('Failed');
                    console.log(`Failed : ${e}`);
                });
        }

        fetchData();
    };

    const handleEdit = (event, id) => {
        const equipmentData = equipments.filter((data) => data.equipment_id === id)[0];
        setEditingEquipment(equipmentData);
        setOpen(true);
        setisAdd(false);
    };

    const handleDelete = (event, id) => {
        axiosInstance(user.token)
            .delete(`equipment/${id}/`)
            .then(() => {
                fetchData();
                toast.success('Deleted Successfully');
            })
            .catch((err) => {
                toast.error('Failed');
                console.log(err);
            });
    };

    const dataFiltered = applyFilter({
        inputData: equipments,
        comparator: getComparator(order, orderBy),
        filterKey: 'name',
        filterValue: filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const fetchData = useCallback(
        () =>
            axiosInstance(user.token)
                .get('equipment/')
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
                    New Equipment
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
                                    { id: 'name', label: 'Equipment Name', align: 'center' },
                                    { id: 'manufracturer', label: 'Manufracturer' },
                                    { id: 'category', label: 'Category' },
                                    { id: 'count', label: 'Count' },
                                    { id: 'weight_class', label: 'Weight Class' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <CustomTableRow
                                            id={row.equipment_id}
                                            key={row.equipment_id}
                                            name={row.name}
                                            category={row.category}
                                            manufracturer={row.manufracturer}
                                            image={row.thumbnail}
                                            count={row.count}
                                            weight_class={row.weight_class}
                                            selected={selected.indexOf(row.equipment_id) !== -1}
                                            handleClick={(event) =>
                                                handleClick(event, row.equipment_id)
                                            }
                                            handleEdit={(event) =>
                                                handleEdit(event, row.equipment_id)
                                            }
                                            handleDelete={(event) =>
                                                handleDelete(event, row.equipment_id)
                                            }
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
