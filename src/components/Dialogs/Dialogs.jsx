import React from 'react';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               <div className={s.dialog}>
                   Anna
               </div>
                <div className={s.dialog}>
                    Alex
                </div>
                <div className={s.dialog + ' ' + s.active}>
                    Sveta
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>
                    hi
                </div>
                <div className={s.message}>
                    hihiuiui
                </div>
                <div className={s.message}>
                    hisdfsdfsdfsd
                </div>
                {/*<Message message={messagesData[0].message}/>*/}
                {/*<Message message={messagesData[1].message}/>*/}
            </div>
        </div>
    )
};

export default Dialogs;
