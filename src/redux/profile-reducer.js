import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: 1, message: 'fdgdfgfdg', likesCount: 12},
        {id: 2, message: 'dfgfdg fdgfdg dgfgf', likesCount: 10},
        {id: 3, message: 'jhkjhk jhhfgs fsfdfd', likesCount: 0},
    ],
    newPostText: 'bla bla',
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
        case SET_STATUS:
            return {...state, status: action.status};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SAVE_PHOTO_SUCCESS:
            debugger
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await  profileAPI.updateStatus(status)
    if(response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await  profileAPI.savePhoto(file)
    if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)
    if(response.data.resultCode === 0) {
        dispatch(getProfile(userId));
    }else {
        //stopSubmit() - это aсtionCreater из redux-form библиотеки
        //'edit-profile' - название формы кот надо остановить если ошибка

        //_error - это общая ошибка для всей формы, если хоть что то заполнено неверно,
        // так же можно указывать какое то конкретное поле используя его name
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0] }));
        //это для того что б ы в src/components/Profile/ProfileInfo/ProfileInfo.jsx в const onSubmit = (formData) => {
        //использовать
        //.then(() => {
        //             setEditMode(false)
        //             })
        //что  еловить момен если ошибка
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;