// import "typeface-roboto";
import 'fontsource-roboto';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { persistor, store } from './store/configueStore';
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'

const trackingId = 'UA-172444942-1'
ReactGA.initialize(trackingId)

const history = createBrowserHistory()

// Initialize google analytics page view tracking
history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
})

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
