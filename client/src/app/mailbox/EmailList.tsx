import React, { useEffect, useState } from 'react';
import uuid from 'uuid/v1'

import EmailListItem from './EmailListItem';
import { Loading } from '../App';
let date = new Date();
let date1 = new Date();
date1.setDate(date1.getDate() - 1);
let date2 = new Date();
date2.setDate(date2.getDate() - 1);
date2.setHours(date2.getHours() + 6);
let date3 = new Date();
date3.setDate(date2.getDate() - 1);
date3.setHours(date2.getHours() + 2);
let date4 = new Date();
date4.setDate(date2.getDate() - 1);;


const TempList = [
    {
        messageId: uuid(clientUrl),
        sender: 'Lisa Guerreo',
        isRead: false,
        subject: 'Company goals for 2019',
        body: 'Hello eveyone I am happy to share with you our new company targes for financial year 2019 - 2020',
        ts: date.valueOf(),
    },
    {
        messageId: uuid(clientUrl),
        sender: 'Peter Gregor',
        isRead: true,
        subject: 'Design for health project',
        body: 'Hello Jessica I love your design work and I would like to talk with you',
        ts: date1.valueOf()
    },
    {
        messageId: uuid(clientUrl),
        sender: 'Sara Richardson',
        isRead: true,
        subject: 'Meeting Zurich',
        body: 'Hey Jessica, I will be in Zurich tomorrow. hope we can meet there and discuss about expansion',
        ts: date2.valueOf()
    },
    {
        messageId: uuid(clientUrl),
        sender: 'Joffery Lanister',
        isRead: true,
        subject: 'Red wedding',
        body: 'Finally I put together photographs from our red wedding',
        ts: date3.valueOf()
    },
    {
        messageId: uuid(clientUrl),
        sender: 'Jessy Kelly',
        isRead: true,
        subject: 'UI/UX Designer Needed for our work on Health Insurance for an term of one year',
        body: 'We need to urgently find an UI/UX designeer for our health insurnae arm in London',
        ts: date3.valueOf()
    }
]

const getMessages = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(TempList)
    }, 1000)
})


export default ({
    messageId = null,
    type
}) => {
    const [[messages, loading], loadMessages] = useState([[], true])
    useEffect(() => {
        loadMessages([[], true])
        getMessages()
            .then((d: any[]) => {
                loadMessages([d, false])
            })
    }, [type])
    if (loading) return Loading()
    return (<div className='email-list'>
        {messages.map((email, i) => <EmailListItem
            selected={email.messageId == messageId}
            {...email}
            key={i
            } />)}
    </div>)
}