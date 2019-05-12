import React, { Fragment } from 'react';
import '../style.scss';
import Left from './layout/Left';
import { Route, Redirect } from 'react-router-dom';
import Main from './body/Main';


export default () => (<Fragment>
    <Route exact path='/' render={() => <Redirect to='/inbox' />} />
    <Route exact path='/inbox' component={Main} />
    <Route path='/inbox/:messageId' component={Main} />
</Fragment>)