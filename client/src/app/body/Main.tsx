import React, { createContext } from 'react';
import Left from "../layout/Left";
import Center from '../layout/Center';
import Right from '../layout/Right';
import { RouterProps, RouteChildrenProps } from 'react-router';
export const MainContext = createContext<any>({ params: {} })
export default (props: RouteChildrenProps) => {
    const { match: { params } } = props
    return (<div className='main'><MainContext.Provider value={{ params }}>
        <Left />
        <Right />
        <Center />
    </MainContext.Provider>
    </div>
    )
}

export function withMain(Component) {
    return function (props) {
        return (
            <MainContext.Consumer>
                {({ params }) => <Component params={params} {...props} />}
            </MainContext.Consumer>
        )
    }
}