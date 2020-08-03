import React from "react";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormControls/FormControls.module.css";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";

const ProfileDataForm = ({handleSubmit, error, profile }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button onClick={() => {}}>save</button></div>
            { error && <div className={s.formSummaryError}>{error}</div> }
            <div>
                <div className={style.userName}><b>Full Name</b>{createField('Full Name', 'fullName', [], Input)}</div>
                <div><b>Looking for a job:</b>{createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}</div>
                <div><b>My Professional skills:</b>{createField('Professional skills', 'lookingForAJobDescription', [], Textarea)}</div>
                <div><b>About me:</b>{createField('About Me', 'aboutMe', [], Textarea)}</div>
            </div>
            <div><b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                return <div className={s.contact} key={key}>
                    <b>{key}:</b>{createField(key, 'contacts.' + key, [], Input)}
                </div>
            })}
            </div>

        </form>
    )
}

const ProfileDataReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataReduxForm;