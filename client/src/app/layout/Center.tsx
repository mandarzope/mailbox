import React from 'react';
import EmailList from '../mailbox/EmailList';
import { connect, ReactReduxContext } from 'react-redux';
import { MainContext, withMain } from '../body/Main';


const Center = (props) => {
    const { params } = props
    return (
        <div className='center'>
            <div className='header'>

            </div>
            <EmailList {...params} />
        </div>
    )
}

// const sToP = s => ({
//     router: s.router
// })
// export default connect(null, sToP)(Center)
export default withMain(Center);