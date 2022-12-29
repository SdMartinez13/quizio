import PropTypes from 'prop-types';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <NextUIProvider>
            <SessionProvider session={pageProps.session}>
                <Navbar />
                <Component {...pageProps} />
            </SessionProvider>
        </NextUIProvider>
    );
}

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
};
