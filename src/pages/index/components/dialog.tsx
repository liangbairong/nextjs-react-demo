import React, {useImperativeHandle, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Img from '../../../es/Components/Img';
import Dialog from '../../../es/Components/Dialog';


interface IBox {
    cRef: any
}

const ConfirmDialog = observer(({cRef}: IBox) => {
    const [open, setOpen] = useState<boolean>(false);
    useImperativeHandle(cRef, () => ({
        open: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        },
    }));


    return <Dialog
        open={open}
        onClose={() => {
            setOpen(false);
        }}
        showMask
        maskClosable
        className={'dialog'}
        isBescroll
    >
        <div className="confirm-dialog">
            <div>
                确认开通/续费剑士贵族？
            </div>
            <div>
                需消耗 XXX

                并将获赠XXX贵族币
            </div>
            <div>
                <div>
                    收益主播
                </div>

                <div>
                    <Img src={new URL('../../../assets/images/add.png',import.meta.url).href}/>
                </div>
                <p>白龙</p>

            </div>

            <div className="submit">
                确定
            </div>
        </div>
    </Dialog>
})
export default ConfirmDialog;
