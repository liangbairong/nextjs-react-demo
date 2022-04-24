import queryString from 'query-string';
import { observable } from 'mobx';
import { isPlainObject } from 'lodash';

type IParams = {
    url?: string;
    region: string;
    anchorId: string;
    lang: string;
    trackId?: number | string;
    curTab?: number | string;
    drawResult?: string; // 红包领取结果
    poolId?: number;
    diamondSvga?: any;
};

type IAuth = {
    Device: string;
    accessToken: string;
    deviceId: string;
    uid: string;
    AppVersion: string;
    region: string;
    nickName?: string;
};

type IServer = {
    timestamp: number;
};

type IAppSystemInfo = {
    language: string;
};

type IListsProps = {
    anchor?: string | number;
    user?: string | number;
};

export interface IStore {
    params: IParams;
    auth: IAuth;
    server: IServer | any;
    listsStyles: IListsProps;
    appSystemInfo: IAppSystemInfo;
    updateAuthInfo: (auth: Record<string, any>) => void;
    updateAppSystemInfo: (appSystemInfo: Record<string, any>) => void;
    updateAppUrl: (search: string) => void;
    updateServerConfig: (options: Record<string, any>) => void;
    updateCurTab: (options: Record<string, any>) => void;
    updateListsStyles: (options: IListsProps) => void;
}

const appStore = observable<IStore>({


    server: {
        timestamp: Date.now(), // 服务器timestamp
    },

    listsStyles: {
        anchor: 30,
        user: 30,
    },

    params: {
        region: '',
        anchorId: '',
        lang: '',
        poolId: 0,
        diamondSvga: '',
    }, // 从url中获取的所有参数

    auth: {
        Device: '',
        accessToken: '',
        deviceId: '',
        uid: '',
        AppVersion: '',
        region: '',
        nickName: '',
    },
    // auth: {
    //     Device: 'IOS',
    //     accessToken: 'a0e3709a7cee4da5805e4072a4485c2a',
    //     deviceId: '338b864b6bd840f196682abd71aaed95',
    //     uid: '11025728',
    //     AppVersion: '4.25.2.30',
    //     region: 'XM',
    //     // nickName: 'MP011465',
    // },

    appSystemInfo: {
        language: '',
    },

    updateAuthInfo(auth) {
        if (isPlainObject(auth)) {
            const { appVersion, device, deviceId, token, userId, region, nickName } = auth;
            Object.assign(this.auth, {
                Device: device,
                accessToken: token,
                uid: userId,
                AppVersion: appVersion,
                deviceId,
                region,
                nickName,
            });
        }
        return this;
    },

    updateServerConfig(options) {
        if (isPlainObject(options)) {
            Object.assign(this.server, options);
        } else {
            this.server = options;
        }
        return this;
    },

    // 获取url中的参数
    updateAppUrl(search) {
        // const search_str = window.decodeURIComponent(search);
        const queryOptions: Record<string, any> = queryString.parse(search);

        if (isPlainObject(queryOptions)) {
            const obj:any = {};
            /* 避免因为url重复导致的参数错误问题 */
            Object.keys(queryOptions).forEach((item) => {
                if (Array.isArray(queryOptions[item])) {
                    // eslint-disable-next-line prefer-destructuring
                    obj[item] = queryOptions[item][0];
                } else {
                    obj[item] = queryOptions[item];
                }
            });

            console.log('入口参数=======>', obj);

            Object.assign(this.params, obj);

            /* 如果jsBridge拿不到区域，直接从url中拿 */
            if (!this.auth.region) {
                Object.assign(this.auth, {
                    region: queryOptions.region,
                });
            }
        }
        return this;
    },

    updateAppSystemInfo(appSystemInfo) {
        if (isPlainObject(appSystemInfo)) {
            const { language = 'en' } = appSystemInfo;
            Object.assign(this.appSystemInfo, {
                language,
            });
            console.log(appSystemInfo, 'jsbridge返回参数appSystemInfo');
        }
        return this;
    },

    updateCurTab(curTabObj) {
        if (isPlainObject(curTabObj)) {
            const { curTab = 'luckDraw' } = curTabObj;
            Object.assign(this.params, {
                curTab,
            });
        }
        return this;
    },

    updateListsStyles(value) {
        if (isPlainObject(value)) {
            Object.assign(this.listsStyles, value);
        }
        return this;
    },
});
export default appStore;
