import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/user.png'
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow, ...props}) => {
    return (
        <div>
            <span>
               <div>
                   <NavLink to={'/profile/' + user.id}>
                       <img className={styles.smallAva}
                            src={user.photos.small != null ? user.photos.small : userPhoto}/>
                   </NavLink>
               </div>
               <div>
                  {user.followed
                      //props.unfollow и props.follow src/components/Users/UsersContainer.jsx 14, 17 строка
                      ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                          unfollow(user.id)
                      }}>Unfollow</button>
                      : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                          follow(user.id)
                      }}>Follow</button>}
                </div>
            </span>
            <span>
                 <span>
                      <div>{user.name}</div>
                      <div>{user.status}</div>
                 </span>
                 <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                 </span>
            </span>
        </div>
    )
}

export default User;