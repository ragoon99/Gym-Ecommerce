import { Helmet } from 'react-helmet-async';

import { FeedbackView } from 'src/sections/feedback/view';

// ----------------------------------------------------------------------

export default function FeedbackPage() {
    return (
        <>
            <Helmet>
                <title> Feedbacks </title>
            </Helmet>

            <FeedbackView />
        </>
    );
}
