import React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { store, history } from './store';
import HashRouter from './HashRouter';


const toINR = function (...args) {
    const val = this.valueOf().toFixed(0)
    return val.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")
}
Number.prototype['toINR'] = toINR;

ReactDOM.render(
    <Provider store={store}>
        <HashRouter history={history}>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);