import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import store from 'src/redux/store';
import AppPage from 'src/pages/app';
import UserPage from 'src/pages/user';
import AboutPage from 'src/pages/about';
import LoginPage from 'src/pages/login';
import SalesPage from 'src/pages/sales';
import OrdersPage from 'src/pages/orders';
import HomePage from 'src/pages/homepage';
import SignUpPage from 'src/pages/signup';
import ContactPage from 'src/pages/contact';
import BillingPage from 'src/pages/billing';
import BasicLayout from 'src/layouts/basic';
import ProfilePage from 'src/pages/profile';
import SuccessPage from 'src/pages/success';
import ProductsPage from 'src/pages/products';
import CheckoutPage from 'src/pages/checkout';
import FeedbackPage from 'src/pages/feedback';
import SuppliersPage from 'src/pages/suppliers';
import EquipmentsPage from 'src/pages/equipments';
import NotFoundPage from 'src/pages/page-not-found';
import { checkForToken } from 'src/redux/authSlice';
import DashboardLayout from 'src/layouts/dashboard';
import TransactionsPage from 'src/pages/transactions';
import PurchaseHistoryPage from 'src/pages/purchase-history';

import ProductDescriptionPage from 'src/sections/products/view/product-details-view';

// ----------------------------------------------------------------------

export default function Router() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated && !user) {
            store.dispatch(checkForToken());
        }
    });

    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="/" element={<BasicLayout user={user} />}>
                <Route index element={<HomePage />} />
                <Route path="homepage" element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="product-detail" element={<ProductDescriptionPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="purchase-history" element={<PurchaseHistoryPage />} />
                <Route path="purchase-success/:slug" element={<SuccessPage />} />
                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route element={<DashboardLayout user={user} />}>
                <Route path="dashboard" element={<AppPage />} />
                <Route path="user" element={<UserPage />} />
                <Route path="equipments" element={<EquipmentsPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="billings" element={<BillingPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="suppliers" element={<SuppliersPage />} />
                <Route path="sales" element={<SalesPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="feedbacks" element={<FeedbackPage />} />
            </Route>
        </Routes>
    );
}
