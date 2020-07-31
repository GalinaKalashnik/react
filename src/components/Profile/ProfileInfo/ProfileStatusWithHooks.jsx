import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {

    //useState - hook - возвращает массив из 2 элементов
    //первое это переданное значение
    //второе функция которая это значение устанавливает
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    //https://habr.com/ru/company/ruvds/blog/445276/
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>
            </div>
            }
            { editMode &&
            <div>
                <input autoFocus={true}
                       onBlur={ deactivateEditMode }
                       onChange={onStatusChange} value={status}/>
            </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;