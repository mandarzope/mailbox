///<reference path="../module.d.ts" />

import { config } from "./common/config";
import { configureStore } from "./common/store";
import reducers from "./common/reducers";
import { createBrowserHistory } from "history";
import { routerReducer } from "./Router";

const initialStateFromWindow = config.isBrowser ? window.__REDUX_STATE__ : {};
var sessionStore = {};
try {
    sessionStore = JSON.parse(sessionStorage.getItem('arvi:state:arviin'));
} catch (e) {

}
export const history = createBrowserHistory({ basename: `/`, forceRefresh: false });
history.listen((location, action) => {
    if (action == 'PUSH' || action == 'POP') {

    }
})
export const store = configureStore(config, history, reducers({
    router: routerReducer(history)
}), Object.assign({}, initialStateFromWindow, sessionStore));

store.dispatch({ type: 'SET_DEVICE' });
store.subscribe(() => {
    sessionStorage.setItem('arvi:state:arviin', JSON.stringify(store.getState()))
})