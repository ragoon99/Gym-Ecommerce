import { Helmet } from 'react-helmet-async';

import { SignupView } from 'src/sections/signup/view';

// ----------------------------------------------------------------------

export default function SignUpPage() {
    return (
        <>
            <Helmet>
                <title> Signup </title>
            </Helmet>

            <SignupView />
        </>
    );
}
