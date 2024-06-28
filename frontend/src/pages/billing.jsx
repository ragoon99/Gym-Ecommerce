import { Helmet } from 'react-helmet-async';

import { BillingView } from 'src/sections/billing/view';

// ----------------------------------------------------------------------

export default function BillingPage() {
    return (
        <>
            <Helmet>
                <title> Billing Logs </title>
            </Helmet>

            <BillingView />
        </>
    );
}
