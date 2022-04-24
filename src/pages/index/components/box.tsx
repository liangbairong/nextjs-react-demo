import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';

import Img from '../../../es/Components/Img';


interface IBox {
    data: any,
    userNobleInfo: any
}

// 外层组件，动态加载context
const Box = observer(({data, userNobleInfo}: IBox) => {
    useEffect(() => {
        // console.log(data)


    }, [])


    return <div className="box-main">
        <div className="box-logo">
            <Img src={new URL('../../../assets/images/add.png', import.meta.url).href} className="box-logo"/>
        </div>
        <div className="box-info">
            <div>
                <Img src={userNobleInfo.avatar}/>
            </div>
            <div>
                <div>{userNobleInfo.nickname}</div>
                {
                    userNobleInfo.nobleType ? <p>{userNobleInfo.nobleType}</p>
                    : <p>暂未开通贵族～</p>
                }
            </div>
            <div>
                {userNobleInfo.nobleCoin}
            </div>
        </div>
        <div className="box-privilege">
            <h3 className="box-privilege-tit">{data.name}特权（6/17）</h3>
            <div className="box-privilege-con">
                <div className="privilege-ul">
                    {
                        data.privilegeList && data.privilegeList.map(((item: any, i: number) => {
                            return <div className="privilege-li" key={`privilege-${i}`}>
                                <Img src={item.iconUrl}/>
                                <p>{item.bizType}</p>
                            </div>
                        }))
                    }
                    <div className="privilege-li" style={{visibility: 'hidden'}}/>
                </div>

            </div>
        </div>
    </div>
})
export default Box;
