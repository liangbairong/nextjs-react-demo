import getConfig from 'next/config'
import appStore from "../stores/appStore";

const makeHeader = () => {
    const { language } = appStore.appSystemInfo;
    const { AppVersion, Device, deviceId, accessToken, uid, region } = appStore.auth;
    if (!accessToken) {
        return { AppVersion, region, 'Accept-Language': language || 'zh-CN' };
    }
    const { nickName, ...resp } = appStore.auth;
    const reqHeader = Object.assign({ ...resp }, { 'Accept-Language': language || 'en' });
    return reqHeader;
};

export default function http(params: any) {
    const { publicRuntimeConfig } = getConfig()
    const base = params.HTTP_BASE || publicRuntimeConfig.ROOT.X_HTTP_BASE

    return new Promise((resolve, reject) => {


        fetch(base + params.url, {
            method: params.method || 'GET', 
            headers: Object.assign({
                'Content-Type': 'application/json',
            }, makeHeader()),
            body: params.data,
            
        }).then(res => {
            console.log(res)

            resolve(res.json())
        }).catch(err => {
            reject(err)
        })
    })
}