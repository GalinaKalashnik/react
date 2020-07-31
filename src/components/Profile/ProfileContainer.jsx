import React from 'react';
import Profile from "./Profile";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {getProfile, getStatus, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        //userId выбранного юзера
        let userId = this.props.match.params.userId;
        //если userId не выбран
        if(!userId) {
            //то ищем userId залогиненого пользователя
            userId = this.props.autorizedUserId
            //если пользователь не залогинен то редиректим на страницу login
            if(!userId) {
                this.props.history.push("/login")
            }
        }

        this.props.getProfile(userId);

        this.props.getStatus(userId)
    }

    render () {
        return (
            <Profile { ...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})
//------------------- вмето этого вссего используем compose ------------------
// // hoc - что б переходить на страницу взяв данные из урла
// // в src/components/Users/Users.jsx добавляем <NavLink to={'/profile/' + u.id }>
// // в src/App.js <Route path='/profile/:userId'
// // а в ProfileContainer componentDidMount() {} вытаскиваем из урла let userId = this.props.match.params.userId;
// // и записываем в axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
// let WithUrlDataContainerComponent = withRouter(ProfileContainer);
//
//
// //hoc src/hoc/withAuthRedirect.js
// let AuthRedirectComponent = withAuthRedirect(WithUrlDataContainerComponent);
//
// export default connect(mapStateToProps, {getProfile})(AuthRedirectComponent);
//------------------- вмето этого вссего используем compose ------------------
export default compose(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer)