import React from "react";
// import Redirect from "react-router-dom/es/Redirect";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom"

let mapStateToPropsForRedirect = (state) => ({
    // src/redux/redux-store.js взяты данныее из let reducers = combineReducers
    //тут state.auth попадает в state
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            //если юзер не залогинен то делаем редирект на страницу логина
            if (!this.props.isAuth) return <Redirect to="/login" />;
            return <Component {...this.props}/>;
        }
    }

    //что бы передать mapStateToPropsForRedirect только isAuth из стейта
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}