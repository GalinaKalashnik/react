import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

//коллекция всех редьюсеров
let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

//что б работало в хроме экстешн для редакса пишем это вместо ========
// // applyMiddleware для thunk (санки), applyMiddleware - это из redux
// // что б ее пользоваться ее надо установить npm i redux-thunk
// let store = createStore(
//     reducers,
//     applyMiddleware(thunkMiddleware));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));


window.__store__ = store;

export default store;