import type {NextPage} from 'next'
import {useEffect, useRef, useState} from 'react'
import {observer} from 'mobx-react-lite';
// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import http from '../../http'

import {NOBLE_MAP} from "../../utils/constMap";

import Box from './components/box'
import ConfirmDialog from './components/dialog'


import classNames from "classnames";
import appStore from "../../stores/appStore";

import styles from './index.module.scss'

const HomeView = observer(({props: {data}}: any) => {


    const sliderRef = useRef<any>(null)
    const confirmDialogRef = useRef<any>(null)

    const list = data.nobleList
    const [action, setAction] = useState(0)
    const [itemAction, setItemAction] = useState<any>({})
    useEffect(() => {
        // setTimeout(() => {
        //     console.log('uid---')
        //     console.log(appStore.auth.uid)
        // }, 100)


        if(list){
            setItemAction(list[action])
        }

    }, [list,action])


    const settings = {
        dots: false, // 点
        lazyLoad: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };


    const cutMenu = (item: any, index: number) => {
        sliderRef.current.slickGoTo(index)
        setAction(index)
    }

    return (
        <div>
            <div>
                <ul className="index-menu">
                    {
                        list && list.map((item: any, i: number) => {
                            return <li key={`menu-${i}`} className={classNames({
                                'action': action === i
                            })} onClick={() => {
                                cutMenu(item, i)
                            }
                            }>
                                {item.name}
                            </li>
                        })
                    }
                </ul>
            </div>
            <Slider ref={sliderRef} {...settings} key={`slider`} className={'slider-main'}>
                {list && list.map((item: any, i: number) => {
                    return (
                        <Box data={item} userNobleInfo={data.userNobleInfo} key={`box-${i}`}/>
                    );
                })}
            </Slider>


            <div className='index-footer'>
                <div>
                    {
                        (data.userNobleInfo && data.userNobleInfo.haveOpened === 1)?
                            <div>
                                <div>
                                    续费{itemAction.renewPrice} /30天
                                </div>
                                <div>
                                    赠送{itemAction.nobleCoin}贵族币
                                </div>
                            </div>:
                            <div>
                                <div>
                                    购买{itemAction.openPrice} /30天
                                </div>
                                <div>
                                    赠送{itemAction.nobleCoin}贵族币
                                </div>
                            </div>
                    }


                </div>
                <div>
                    {
                        (data.userNobleInfo && data.userNobleInfo.haveOpened === 1) ? <div onClick={() => {
                            confirmDialogRef.current.open()
                        }}>
                            立即续费
                        </div> : <div onClick={() => {
                            confirmDialogRef.current.open()
                        }}>
                            立即开通
                        </div>
                    }

                </div>
            </div>

            <ConfirmDialog cRef={confirmDialogRef}/>
        </div>
    );
});

// 外层组件，动态加载context
const Index: NextPage = (props: any) => (
    <HomeView props={props}/>
);
export default Index;

//getStaticProps getServerSideProps
export async function getServerSideProps() {
    const res: any = await http({
        url: '/ee/noble/user/myNodePage'
    })
    let data = res.data

    console.log('uid---')
    console.log(appStore.auth.uid)
    if (res.status === 200) {
        if (data) {
            const attr: any = []
            data.nobleList.forEach((item: any) => {
                const name = item.nobleType ? NOBLE_MAP[item.nobleType] : '--'
                attr.push({
                    ...item,
                    name: name
                })
            })
            data.nobleList = attr
        }
    }

    return {
        props: {
            data: data
        }
    }
}