import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title> Page Not Found </title>
            </Helmet>

            <NotFoundView />
        </>
    );
}
