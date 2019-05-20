import React, { PureComponent, Children } from "react";
import { Router } from "react-router";
// import { HashRouter } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import { connect } from "react-redux";

class HashRouter extends PureComponent<{ history: History }, any> {
    constructor(props) {
        super(props)
        const { history } = this.props;

        const handleLocationChange = (location, action, isFirstRendering = false) => {
            onLocationChanged(location, action, isFirstRendering)
        }
        history.listen(handleLocationChange)
        handleLocationChange(history.location, history.action, true)
    }
    render() {
        const { children, history } = this.props;
        const count = Children.count(children)
        return <Router history={history}>
            {children}
        </Router>
    }
}

export const routerReducer = (history) => {
    const initialRouterState = {
        location: history.location,
        action: history.action,
    };
    return (state = initialRouterState, { type, payload } = { type: null, payload: null }) => {
        if (type === LOCATION_CHANGE) {
            const { location, action, isFirstRendering } = payload
            return isFirstRendering
                ? state
                : {
                    ...state, location, action
                }
        }
        return state
    }
}
/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

export const onLocationChanged = (location, action, isFirstRendering = false) => ({
    type: LOCATION_CHANGE,
    payload: {
        location,
        action,
        isFirstRendering,
    }
})

export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'

const updateLocation = (method) => {
    return (...args) => ({
        type: CALL_HISTORY_METHOD,
        payload: {
            method,
            args
        }
    })
}

/**
 * These actions correspond to the history API.
 * The associated routerMiddleware will capture these events before they get to
 * your reducer and reissue them as the matching function on your history.
 */
export const push = updateLocation('push')
export const replace = updateLocation('replace')
export const go = updateLocation('go')
export const goBack = updateLocation('goBack')
export const goForward = updateLocation('goForward')

export const routerActions = { push, replace, go, goBack, goForward }
/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
export const routerMiddleware = (history) => store => next => action => { // eslint-disable-line no-unused-vars
    if (action.type !== CALL_HISTORY_METHOD) {
        return next(action)
    }

    const { payload: { method, args } } = action
    history[method](...args)
}

const dToP = d => ({
    onLocationChanged: (location, action, isFirstRendering) => d(onLocationChanged(location, action, isFirstRendering))
})
export default connect(null, dToP)(HashRouter);