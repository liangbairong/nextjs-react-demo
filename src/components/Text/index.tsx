import React, { FC } from 'react';

import intl from 'react-intl-universal';

import { isEmpty } from 'lodash';
 // @ts-ignore
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';




interface TextProps {
    i18nKey: string;
    options?: Record<string, any>;
}

/**
 * i18nKey: 必须，国际化key
 * options：非必须，国际化参数
 */

export const Text: FC<TextProps> = ({
    i18nKey,
    options = {},
    ...props
}: TextProps): JSX.Element => (
    // 如果不携带参数，不返回html.如果携带参数，返回html
    <>
        {
            // eslint-disable-next-line no-nested-ternary
            // i18nKey
            //     ? isEmpty(options)
            //         ? intl.get(i18nKey).d(<span {...props} />)
            //         : intl.getHTML(i18nKey, options).d(<span {...props} />)
            //     : ''

            ReactHtmlParser(i18nKey,{
                transform: (node:any,index:number) => {
                    console.log(node);
                    if(node.type==='tag'){
                        return '2222'
                    }
                  }
            })
        }
    </>
);
