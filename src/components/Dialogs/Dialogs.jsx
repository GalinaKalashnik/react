import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageFormRedux from "./AddMessageForm";

const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map((d, index) => <DialogItem name={d.name} id={d.id} key={index} />)
    let messagesElements = state.messages.map((m, index) => <Message message={m.message} key={index} />)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessagesBody)
    }

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;
