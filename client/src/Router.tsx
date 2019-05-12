import React, { PureComponent } from "react";
import { Router } from "react-router";
import { HashRouter } from "react-router-dom";
import { createBrowserHistory, History } from "history";

export default class extends PureComponent<{ history: History }, any> {
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
        const { children } = this.props;
        return <HashRouter>
            {children}
        </HashRouter>
    }
}

export const routerReducer = (history) => () => {
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

const dToP = d => ({
    onLocationChanged: (location, action, isFirstRendering) => d(onLocationChanged(location, action, isFirstRendering))
})