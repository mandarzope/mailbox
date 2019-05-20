import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { MainContext, withMain } from '../body/Main';


const RightNotification = (props) => {
    return <div className={cn('right-notification')}>
        
    </div>
}
// const sToP = s => ({
//     router: s.router
// })
// export default connect(null, sToP)(Right)
export default RightNotification;//withMain(Right);
