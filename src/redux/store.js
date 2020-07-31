import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'fdgdfgfdg', likesCount: 12},
                {id: 2, message: 'dfgfdg fdgfdg dgfgf', likesCount: 10},
                {id: 3, message: 'jhkjhk jhhfgs fsfdfd', likesCount: 0},
            ],
            newPostText: 'bla bla'
        },

        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Anna'},
                {id: 2, name: 'Gala'},
                {id: 3, name: 'Alex'},
            ],
            messages: [
                {id: 1, message: 'bla bla bla Anna'},
                {id: 2, message: 'bla bla   Gala'},
                {id: 3, message: 'bla  Alex'},
                {id: 4, message: 'bla bla  Masha'},
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber() {
        console.log('state changed');
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    }
}

export default store;