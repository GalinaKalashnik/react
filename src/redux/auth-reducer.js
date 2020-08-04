import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'my-app/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'my-app/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    //это точно придет в респонсе данные о залогиненом юзере
    userId: null,
    email: null,
    login: null,
    //просто булевое значеник ка флаг что юзер залогтнен или нет
    //по дефолту false незалогинен
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

//id, email, login - авторизационные данные кот приходят с api
// из https://social-network.samuraijs.com/api/1.0/auth/me
//setAuthUserData запустит SET_USER_DATA только если юзер залогинен
//src/components/Header/HeaderContainer.jsx 17 строка if(response.data.resultCode === 0) {
export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload:
        {userId, email, login, isAuth}  });
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} });

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.getAuthMe();
    //resultCode это данные которые приходит из  https://social-network.samuraijs.com/api/1.0/auth/me
    // если 0 то зпрегестрирован пользователь если 1 то ошибка, не зарегестрированный
    if(response.data.resultCode === 0) {
        //авторизационные данные кот приходят с api
        // из https://social-network.samuraijs.com/api/1.0/auth/me

        // с помощью let {id, email, login}
        //делаем деструктуризацию response.data.data
        //https://social-network.samuraijs.com/docs#auth_me_get
        let {id, email, login} = response.data.data;

        //setAuthUserData запустится только если юзер залогинен
        //и прередаст данные id, email, login, isAuth : true
        //они попадут в ...action.payload
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    //resultCode это данные которые приходит из  https://social-network.samuraijs.com/api/1.0/auth/me
    // если 0 то зпрегестрирован пользователь если 1 то ошибка, не зарегестрированный
    if(response.data.resultCode === 0) {
        //при логине запускаем authAPI.getAuthMe()
        dispatch(getAuthUserData());
    } else {
        //stopSubmit() - это aсtionCreater из redux-form библиотеки
        //'login' - название формы кот надо остановить если ошибка

        //_error - это общая ошибка для всей формы, если хоть что то заполнено неверно,
        // так же можно указывать какое то конкретное поле используя его name

        let msg = response.data.messages.length > 0 ? response.data.messages[0] : 'Common error';
        dispatch(stopSubmit('login', {_error: msg}));

        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if(response.data.resultCode === 0) {
        //при logout логине запускаем диспатч setAuthUserData , где сетаем
        // что данные юзера равны null и isAuth false
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;