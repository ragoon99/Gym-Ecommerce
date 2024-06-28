import { Helmet } from 'react-helmet-async';

import OrderView from 'src/sections/orders/views/orders-view';

// ----------------------------------------------------------------------

export default function OrdersPage() {
    return (
        <>
            <Helmet>
                <title> Page Not Found </title>
            </Helmet>

            <OrderView />
        </>
    );
}
