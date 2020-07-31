import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, unfollow, follow, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div>
            {
                //в пропсах users потому что в src/components/Users/UsersContainer.jsx 8 строка
                props.users.map(u => <User key={u.id}
                                           user={u}
                                           followingInProgress={followingInProgress}
                                           unfollow={unfollow}
                                           follow={follow} />)
            }
        </div>
    </div>
}

export default Users;