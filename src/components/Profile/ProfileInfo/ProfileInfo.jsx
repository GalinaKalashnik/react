import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import styles from "../../Users/Users.module.css";
import userPhoto from "../../../assets/user.png";
import ProfileDataReduxForm from "./ProfileDataForm";


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelect = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
            })
    }

    return (
        <div>
            <div>
                <img src={profile.photos.large || 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'} />
            </div>
            <div className={s.discriptionBlock}>
                <img className={styles.smallAva}
                     src={profile.photos.small != null ? profile.photos.small : userPhoto}/>
                {isOwner && <div><input type={'file'} onChange={onMainPhotoSelect} /></div> }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {editMode
                    ? <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={ () => {setEditMode(true)} }/>
                }
            </div>
        </div>
    )
}
const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
            <div>
                <p className={s.userName}>{profile.fullName}</p>
                <p><b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</p>
                {profile.lookingForAJob && <p><b>My Professional skills:</b><i>{profile.lookingForAJobDescription}</i></p>}
                {profile.aboutMe && <p className={s.description}><b>About me:</b>{profile.aboutMe}</p>}
            </div>
            <div><b>Contacts:</b>{Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}



const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;