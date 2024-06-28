import { Helmet } from 'react-helmet-async';

import { TransactionView } from 'src/sections/transactions/view';

// ----------------------------------------------------------------------

export default function TransactionsPage() {
    return (
        <>
            <Helmet>
                <title> Transactions </title>
            </Helmet>

            <TransactionView />
        </>
    );
}
