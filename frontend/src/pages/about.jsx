import { Helmet } from 'react-helmet-async';

import { AboutUsView } from 'src/sections/about-us/view';

// ----------------------------------------------------------------------

export default function AboutPage() {
    return (
        <>
            <Helmet>
                <title> About </title>
            </Helmet>

            <AboutUsView />
        </>
    );
}
