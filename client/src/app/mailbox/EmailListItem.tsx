import React from 'react';
import cn from 'classnames';
import timestamp from '../../common/utils/timestamp';
import { Link } from 'react-router-dom';

export default ({
    sender,
    subject,
    body,
    isRead,
    messageId,
    ts
}) => (<Link to={`/inbox/${messageId}`} className={cn('email-list-item', {
    isRead: !isRead
})}>
    <div className='ts'>{ts}</div>
    <div className='label'></div>
    <div className='sender'>
        <span>{sender}</span>
        <div className='ts'>{timestamp(ts)}</div>
    </div>
    <div className='subject'>{subject}</div>
    <div className='body'>{body}</div>
</Link>)