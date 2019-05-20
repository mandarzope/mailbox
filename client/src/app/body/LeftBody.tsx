import React, { createContext } from 'react';
import cn from 'classnames';
import { withMain } from './Main';
import { Link } from 'react-router-dom';
const MenuItems = [
    { count: 12, label: 'Inbox', link: 'inbox' },
    { count: 12, label: 'Sent', link: 'sent' },
    { count: 12, label: 'Draft', link: 'draft' },
    { count: 12, label: 'Junk', link: 'junk' },
    { count: 12, label: 'Trash', link: 'trash' },
    { count: 12, label: 'Reminder', link: 'reminder' }
]
const LeftBody = (props) => {
    const { params: { type } } = props;
    return (<div className='left-body'>
        <div className='nav-list'>
            {MenuItems.map(({ label, link, count }, i) => <Link to={`/${link}`} className={cn('nav-item', {
                active: type == link
            })}
                key={i}>{label}
                <span>{count}</span>
            </Link>)}
        </div>
    </div>)
}

export default withMain(LeftBody)