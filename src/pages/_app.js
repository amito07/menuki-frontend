import '../styles/restaurant.css';
import '../styles/FoodSection.css';
import '../styles/Footer.css';
import { ReduxProvider } from '@/redux/provider';
export default function App({ Component, pageProps }) {
    return (
        <ReduxProvider>
            <Component {...pageProps} />{' '}
        </ReduxProvider>
    );
}
