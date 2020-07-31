import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import styles from "../../Users/Users.module.css";
import userPhoto from "../../../assets/user.png";

const ProfileInfo = ({profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />
    }
    console.log(profile);
    return (
        <div>
            <div>
                <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' />
            </div>
            <div className={s.discriptionBlock}>
                {/*<img src={props.profile.photos.large} />*/}
                <img className={styles.smallAva}
                     src={profile.photos.small != null ? profile.photos.small : userPhoto}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <p className={s.userName}>{profile.fullName}</p>
                <p className={s.description}>{profile.aboutMe}</p>
            </div>
        </div>
    )
}

export default ProfileInfo;