import { Helmet } from 'react-helmet-async';

import SupplierView from 'src/sections/suppliers/view/suppliers-view';

// ----------------------------------------------------------------------

export default function SuppliersPage() {
    return (
        <>
            <Helmet>
                <title> Suppliers </title>
            </Helmet>

            <SupplierView />
        </>
    );
}
