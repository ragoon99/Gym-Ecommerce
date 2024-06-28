import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

import {
    Table,
    TableRow,
    Container,
    TableHead,
    TableCell,
    TableBody,
    Typography,
    TableContainer,
} from '@mui/material';

import axiosInstance from 'src/utils/axios-instance';

const PurchaseHistoryView = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const fetchData = useCallback(async () => {
        await axiosInstance(user.token)
            .get('/purchase-history/')
            .then((res) => {
                console.log(res.data);
                setPurchaseHistory(res.data);
            });
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return isAuthenticated ? (
        <Container>
            <Typography variant="h5" gutterBottom>
                Your Purchase History
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order #</TableCell>
                            <TableCell>Place On</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchaseHistory.map((order) => (
                            <TableRow>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    {new Date(
                                        order.transaction.transaction_date
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        display: 'flex',
                                        gap: 4,
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                    }}
                                >
                                    {order.equipment_name}
                                    <img
                                        src={order.equipment.thumbnail}
                                        alt={order.equipment.name}
                                        width={40}
                                    />
                                </TableCell>
                                <TableCell>Rs. {order.quantity * order.price_per}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    ) : (
        <Navigate to="/login" />
    );
};

export default PurchaseHistoryView;
