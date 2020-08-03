import React, {Component, Suspense} from 'react';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

//React.lazy
//вместо
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
//пишем
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));



class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render () {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar/>
            <div className='app-wrapper-content'>
                {/*? знак в конце говорит что параметр не обязателен и */}
                {/*если он не передн то показываем свой профиль*/}
                <Route path='/profile/:userId?'
                       render={withSuspense(ProfileContainer)}/>
                <Route path='/dialogs'
                       render={withSuspense(DialogsContainer)}/>
                <Route path='/users'
                       render={() => <UsersContainer /> }/>
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
                <Route path='/login' render={() => <Login />}/>
            </div>
        </div>
    }
}
const mapStateToProps = (state) => ({
    //что бы state.app.initialize был в state
    //добавляем редюсер в let reducers = combineReducers({  в src/redux/redux-store.js
    initialized: state.app.initialized,
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props) => {
    return <BrowserRouter>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </BrowserRouter>
}

export default MainApp;
