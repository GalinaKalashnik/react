import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    //теперь когда выполнится запрос, мы сможем заинициализировать приложение
    promise.then(() => {
        dispatch(setInitializedSuccess());
    })

    //Чтобы дождаться выполнения нескольких dispatch
    //      let promise = dispatch(getAuthUserData());
    //      let promise2 = dispatch(getAuthUserData2());
    //      let promise3 = dispatch(getAuthUserData3());
    //      Promise.all([promise, promise2, promise3]).then(()=>{
    //          dispatch(setInitializedSuccess());
    //      })
}

export default appReducer;