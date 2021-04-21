import React from "react";
import s from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogItem =(props) => {
    let path = "/dialogs/" + props.id
    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message =(props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}
const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Anna" id="1" />
                <DialogItem name="Alex" id="2" />
                <DialogItem name="Dima" id="3" />
            </div>
            <div className={s.messages}>
                <Message message='hi' />
                <Message message='hihiuiui' />
                <Message message='hisdfsdfsdfsd' />

                {/*<Message message={messagesData[0].message}/>*/}
                {/*<Message message={messagesData[1].message}/>*/}
            </div>
        </div>
    )
};

export default Dialogs;
