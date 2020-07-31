import React from 'react';
import {connect} from 'react-redux';
import {
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers,
    follow,
    unfollow
} from '../../redux/users-reducer';
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import {compose} from "redux";
import {
    getUsers,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount
} from "../../redux/selectors/users-selectors";

class UsersContainer extends React.Component{
    componentDidMount() {

        //const {currentPage, pageSize } = this.props; - деструктуризация в классовой компоненте
        const {currentPage, pageSize } = this.props;
        console.log(pageSize);
        this.props.requestUsers(currentPage, pageSize)
        // this.props.toggleIsFetching(true);
        //
        // //this.props.currentPage и this.props.pageSize берутся из стейта записанные в него в mapStateToProps src/components/Users/UsersContainer.jsx
        // //then(data смотри .then(response => {
        // //         return response.data
        // //     }) в requestUsers src/api.js
        // usersAPI.requestUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //     })
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize)
        // this.props.toggleIsFetching(true);
        // this.props.setCurrentPage(pageNumber);
        // //then(data смотри .then(response => {
        // //         return response.data
        // //     }) в requestUsers src/api.js
        // usersAPI.requestUsers(pageNumber, this.props.pageSize).then(data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items)
        //     })
    }

    render () {
        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      onPageChanged={this.onPageChanged}
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      toggleFollowingProgress={this.props.toggleFollowingProgress}
                      followingInProgress={this.props.followingInProgress}
            />
        </>
    }

}

// let mapStateToProps = (state) => {
//     return {
//         //заносим в стейт переменные из initialState:7 из src/redux/users-reducer.js
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => {
    return {
        //заносим в стейт переменные из initialState:7 из src/redux/users-reducer.js
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         },
//
//     }
// }


//------------------- вмето этого вссего используем compose ------------------
// export default connect(mapStateToProps,
//     {follow, unfollow, setCurrentPage,
//         toggleFollowingProgress, requestUsers})(UsersContainer);
//------------------- вмето этого вссего используем compose ------------------

export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers})
)(UsersContainer)