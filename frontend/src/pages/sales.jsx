import { Helmet } from 'react-helmet-async';

import { SalesView } from 'src/sections/sales/view';

// ----------------------------------------------------------------------

export default function SalesPage() {
    return (
        <>
            <Helmet>
                <title> Sales </title>
            </Helmet>

            <SalesView />
        </>
    );
}
