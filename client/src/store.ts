///<reference path="../module.d.ts" />

import { config } from "./common/config";
import { configureStore } from "./common/store";
import reducers from "./common/reducers";
import { createBrowserHistory, createHashHistory } from "history";
import { routerReducer, routerMiddleware } from "./HashRouter";

const initialStateFromWindow = config.isBrowser ? window.__REDUX_STATE__ : {};
var sessionStore = {};
try {
    sessionStore = JSON.parse(sessionStorage.getItem('mailbox:state:arviin'));
} catch (e) {

}
export const history = createHashHistory({ basename: `/` });
history.listen((location, action) => {
    if (action == 'PUSH' || action == 'POP') {

    }
})
export const store = configureStore(config, [routerMiddleware(history)], reducers({
    router: routerReducer(history)
}), Object.assign({}, initialStateFromWindow, sessionStore));

store.dispatch({ type: 'SET_DEVICE' });
store.subscribe(() => {
    console.log(store.getState())
    sessionStorage.setItem('mailbox:state:arviin', JSON.stringify(store.getState()))
})