import React, { Fragment } from 'react';
import '../style.scss';
import Left from './layout/Left';
import { Route, Redirect, Switch } from 'react-router-dom';
import Main from './body/Main';
export const Loading = () => <div className='absolute loader' >
    <svg className="icon x48">
        <use xlinkHref="#puff" />
    </svg>
</div>

export default () => (<Fragment>
    <Switch>
        <Route exact path='/' render={() => <Redirect to='/inbox' />} />
        <Route path='/:type/:messageId' component={Main} />
        <Route path='/:type' component={Main} />
    </Switch>
</Fragment>)