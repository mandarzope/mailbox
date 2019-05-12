import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { store, history } from './store';
// import { Router } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Router from './Router';


const toINR = function (...args) {
    const val = this.valueOf().toFixed(0)
    return val.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
}
Number.prototype['toINR'] = toINR;

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);