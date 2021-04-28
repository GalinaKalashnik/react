import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message"

const Dialogs = (props) => {

    let dialogsElements =  props.state.dialogs
        .map(d => <DialogItem name={d.name} id={d.id} key={d.id}/> )

    let messagesElements = props.state.messages
        .map( m => <Message message={m.message} id={m.id} key={m.id} />)

    let newMessageElement = React.createRef();
    let newMessage = () => {
        let newMessageText = newMessageElement.current.value;
        alert(newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div>
                <div>
                    <textarea ref={newMessageElement}></textarea>
                </div>
                <div>
                    <button onClick={newMessage}>Add Message</button>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;
