import { Helmet } from 'react-helmet-async';

import { PurchaseHistoryView } from 'src/sections/purchase-history/view';

// ----------------------------------------------------------------------

export default function PurchaseHistoryPage() {
    return (
        <>
            <Helmet>
                <title> Purchase History </title>
            </Helmet>

            <PurchaseHistoryView />
        </>
    );
}
