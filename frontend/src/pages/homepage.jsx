import { Helmet } from 'react-helmet-async';

import HomepageView from 'src/sections/homepage/view/homepage-view';

// ----------------------------------------------------------------------

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title> Homepage </title>
            </Helmet>

            <HomepageView />
        </>
    );
}
