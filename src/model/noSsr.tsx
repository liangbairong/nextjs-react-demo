
import { useEffect, useState } from 'react'
import appStore from '../stores/appStore'
import JSBridge from '../utils/JSBridge'

const NoSsr = () => {
 
    useEffect(() => {
        console.log('ww');

        if(window){
            updateAuthInfo();
            updateAppSystemInfo();
            userAgentClass()
        }

    }, [])


    /* 获取授权信息 */
    const updateAuthInfo = () => {
        JSBridge.GetAppUserInfo((res: any) => {
            console.log('Auth=======>', res);
            appStore.updateAuthInfo(res);
        });
    };

    /* 获取系统信息 */
    const updateAppSystemInfo = () => {
        JSBridge.GetAppSystemInfo((res: any) => {
            console.log('触发jsbridge事件-GetAppSystemInfo', res);
            appStore.updateAppSystemInfo(res);
        });
    };

    const userAgentClass = () => {
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
        if (isiOS) {
            document.body.classList.add('body-ios');
        } else if (isAndroid) {
            document.body.classList.add('body-android');
        }
    };

    return <></>
}

export default NoSsr


