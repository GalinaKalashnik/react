import React from "react";
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               <div className={s.dialog}>
                   <NavLink to="/dialogs/1">Anna</NavLink>
               </div>
                <div className={s.dialog}>
                    <NavLink to="/dialogs/2">Alex</NavLink>
                </div>
                <div className={s.dialog + ' ' + s.active}>
                    <NavLink to="/dialogs/3">Sveta</NavLink>
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
