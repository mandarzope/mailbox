import React from 'react';
import LeftBody from '../body/LeftBody';

export default () => (<div className='left'>
    <div className='header'>
        <svg className="icon"><use xlinkHref="#i-edit"></use></svg> <span>New Message</span>
    </div>
    <LeftBody />
</div>)