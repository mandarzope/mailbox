import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { MainContext, withMain } from '../body/Main';
import RightNotification from './RightNotification';
import { Link } from 'react-router-dom';


const Right = (props) => {
    const { params: { messageId, type } } = props;
    if (!messageId) return <RightNotification />

    useEffect(() => {

    }, [messageId]);

    return <div className={cn('right', {
        open: !!messageId
    })}>
        <div className='header'>
            <Link to={`/${type}`} className='close'><svg className="icon x32"><use xlinkHref="#i-close"></use></svg></Link>
        </div>
    </div>
}
// const sToP = s => ({
//     router: s.router
// })
// export default connect(null, sToP)(Right)
export default withMain(Right);
