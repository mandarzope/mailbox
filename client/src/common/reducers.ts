// import { routerReducer } from 'connected-react-router';
import { Reducer, combineReducers, Action } from 'redux';
// import { connectRouter } from 'connected-react-router';
// import { order } from '@/_reducers/order';
// import { inputs } from '@/_reducers/inputs';

export default (reducers) => combineReducers({
    // router: connectRouter(history),
    device: (prevState = {}, action: Action<any>) => {
        if (action.type == 'SET_DEVICE') {
            return setDeviceType()
        }
        return prevState;

    },
    ...reducers
});

export const setDeviceType = () => {
    var ismobile = false;
    var isdesktop = false;
    var isandroid = null;
    var istablet = false;
    var devicetype = 'desktop';
    if (navigator && navigator.userAgent) {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.match(/android/i)) {
            document.body.classList.add('mobile');
            ismobile = true;
            if (!userAgent.match(/mobile/)) {
                istablet = true;
                document.body.classList.add('tablet');
            } else {
                devicetype = 'android';
            }
        } else if (navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/BlackBerry/i)) {
            ismobile = true;
            document.body.classList.add('mobile');
        } else if (navigator.userAgent.match(/iPhone/i)) {
            ismobile = true;
            devicetype = 'iphone';
            document.body.classList.add('mobile');
            document.body.classList.add('iphone');
        } else if (navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
        ) {
            devicetype = 'ipad';
            document.body.classList.add('ipad');
        } else {
            isdesktop = true;
            document.body.classList.add('desktop');
        }
    }
    window['ismobile'] = ismobile;
    window['isdesktop'] = isdesktop
    return {
        ismobile,
        isdesktop,
        isandroid,
        istablet,
        devicetype
    };
}