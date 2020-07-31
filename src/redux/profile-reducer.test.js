import {render} from "@testing-library/react";
import App from "../App";
import React from "react";
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

// 1. test data
let state = {
    posts: [
        {id: 1, message: 'fdgdfgfdg', likesCount: 12},
        {id: 2, message: 'dfgfdg fdgfdg dgfgf', likesCount: 10},
        {id: 3, message: 'jhkjhk jhhfgs fsfdfd', likesCount: 0},
    ]
};

test('length of new post should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('gala new post')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

test('new post message should be "gala new post"', () => {
    // 1. test data
    let action = addPostActionCreator('gala new post')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts[3].message).toBe('gala new post');
});

test('new post likesCount should be 0', () => {
    // 1. test data
    let action = addPostActionCreator('gala new post')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts[3].likesCount).toBe(0);
});

test('after delete length shoul be decrement', () => {
    // 1. test data
    let action = deletePost(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(2);
});

