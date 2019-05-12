import React from 'react';
import Left from "../layout/Left";
import Center from '../layout/Center';
import Right from '../layout/Right';

export default (props) => {
    return (<div className='main'>
        <Left />
        <Right />
        <Center />
    </div>
    )
}