import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';

import store from './redux/store';

// ----------------------------------------------------------------------

export default function App() {
    useScrollToTop();

    return (
        <ThemeProvider>
            <Provider store={store}>
                <Router />
            </Provider>
        </ThemeProvider>
    );
}
