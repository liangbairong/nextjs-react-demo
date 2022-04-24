import React, { useEffect, useState } from 'react';

import intl from 'react-intl-universal';

import { observer } from 'mobx-react-lite';
import appStore from '../stores/appStore';


import EN from '../assets/i18n/en_us/index.json'
import CN from '../assets/i18n/zh_cn/index.json'
import VI from '../assets/i18n/vi_vi/index.json'
import TW from '../assets/i18n/zh_tw/index.json'
import ID from '../assets/i18n/id_id/index.json'

// app locale data
export const locales:any = {
    'zh-CN': CN,
    'zh-TW': TW,
    en: EN,
    vi: VI,
    id: ID,
};

export default locales



// type I18nEntryProps = {
//     children: JSX.Element[] | JSX.Element;
// };

// const I18nEntry = observer((props: I18nEntryProps): JSX.Element => {
//     const { children } = props;


//     const { language } = appStore.appSystemInfo;

//     const currentLocale = language || 'zh-CN';

//     const [initDone, setInitDone] = useState(true);

//     useEffect(() => {
//         // setInitDone(false);
//         intl.init({
//             currentLocale, // TODO: determine locale here
//             locales,
//         }).then(() => {
//             setTimeout(() => {
//                 setInitDone(true);
//             }, 0);
//         });
//     }, [currentLocale]);

//     return <>{initDone && children}</>;
// });

// export default I18nEntry;
