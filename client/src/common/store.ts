///<reference path="../../module.d.ts" />
import { createStore, applyMiddleware, compose, Reducer } from 'redux';
import thunk from 'redux-thunk';

export function configureStore(config, middleware, rootReducer, initialState?: any) {
    const composeEnhancers = (
        config.isDevelopment &&
        window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) || compose;
    const middlewares: any[] = [
        ...middleware,
        thunk
    ];
    const enhancers = [applyMiddleware(...middlewares)].concat(
        // config.isDevelopment ? composeWithDevTools(DevTools.instrument()) : 
        []);
    const enhancer = composeEnhancers(...enhancers);

    const storeWithHmr = createStore(
        rootReducer,
        initialState,
        enhancer
    );
    return storeWithHmr;
}