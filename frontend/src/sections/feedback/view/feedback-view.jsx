import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
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

import TableHeader from 'src/sections/common/table-header';
import CustomTableRow from 'src/sections/common/table-toolbar';

import FeedbackTableRow from '../feedback-table-row';
import TableNoData from '../../common/table-no-data';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../../utils/utils';
// ----------------------------------------------------------------------

export default function FeedbackView() {
    const { user } = useSelector((state) => state.auth);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [feedbacks, setFeedbacks] = useState([]);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = feedbacks.map((n) => n.id);
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

    const dataFiltered = applyFilter({
        inputData: feedbacks,
        comparator: getComparator(order, orderBy),
        filterKey: 'name',
        filterValue: filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    const handleDelete = async (event, id) => {
        await axiosInstance(user.token)
            .delete(`/feedback/${id}/`)
            .then((res) => {
                toast.success('Deletions Success');
            })
            .catch((err) => {
                console.log(err);
                toast.err('Failed to Delete');
            });

        fetchData();
    };

    const fetchData = useCallback(
        () =>
            axiosInstance(user.token)
                .get('/feedback/')
                .then((res) => {
                    setFeedbacks(res.data.results);
                }),
        [user]
    );

    useEffect(() => {
        fetchData();
    }, [user, fetchData]);

    return (
        <Container>
            <ToastContainer />
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Bills</Typography>
            </Stack>

            <Card>
                <CustomTableRow
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
                                rowCount={feedbacks.length}
                                numSelected={selected.length}
                                onRequestSort={handleSort}
                                onSelectAllClick={handleSelectAllClick}
                                headLabel={[
                                    { id: 'name', label: 'Name' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'message', label: 'Message' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <FeedbackTableRow
                                            id={row.feedback_id}
                                            key={row.feedback_id}
                                            name={row.name}
                                            message={row.message}
                                            email={row.email}
                                            avatarUrl={row.profileURL}
                                            selected={selected.indexOf(row.feedback_id) !== -1}
                                            handleClick={(event) =>
                                                handleClick(event, row.feedback_id)
                                            }
                                            handleDelete={(event) =>
                                                handleDelete(event, row.feedback_id)
                                            }
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, feedbacks.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page}
                    component="div"
                    count={feedbacks.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
