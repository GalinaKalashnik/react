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

    let dialogs = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ]

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'eeee'},
        {id: 5, message: 'Yo'}
    ]

    let dialogsElements =  dialogs
        .map(d => <DialogItem name={d.name} id={d.id} /> )

    let messadesElements = messages
        .map( m => <Message message={m.message} id={m.id} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messadesElements}
            </div>
        </div>
    )
};

export default Dialogs;
