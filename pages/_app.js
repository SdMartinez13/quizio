import PropTypes from 'prop-types';
import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Navbar />
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object,
};
