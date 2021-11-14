import {addPostAC, deletePostAC, profileReducer} from "./profileReducer";
import {render, screen} from "@testing-library/react";
import {App} from "../App";
import React from "react";


test('new post should be added', () => {
    let action = addPostAC('IT-KAMASUTRA.COM')
    let state = {
        posts: [
            {id: 1, message: 'Hello! How`s life?', like: 22},
            {id: 2, message: 'Hey hey! How`re you things?', like: 15},
            {id: 3, message: 'Hey buddy! How`re you?', like: 35},
            {id: 4, message: 'Hey there! Take it easy?', like: 77},
        ],
        profile: null,
        status:'',
        updateStatus: '',
    }
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(5)
    expect(newState.posts[4].like).toBe(0)


});

test('after deleting length of messages should be decrement', () => {
    let action = deletePostAC(1)
    let state = {
        posts: [
            {id: 1, message: 'Hello! How`s life?', like: 22},
            {id: 2, message: 'Hey hey! How`re you things?', like: 15},
            {id: 3, message: 'Hey buddy! How`re you?', like: 35},
            {id: 4, message: 'Hey there! Take it easy?', like: 77},
        ],
        profile: null,
        status:'',
        updateStatus: '',
    }
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[0].id).toBe(2)


});

test('after deleting length of messages should be decrement if id is incorrect', () => {
    let action = deletePostAC(1000)
    let state = {
        posts: [
            {id: 1, message: 'Hello! How`s life?', like: 22},
            {id: 2, message: 'Hey hey! How`re you things?', like: 15},
            {id: 3, message: 'Hey buddy! How`re you?', like: 35},
            {id: 4, message: 'Hey there! Take it easy?', like: 77},
        ],
        profile: null,
        status:'',
        updateStatus: '',
    }
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(4)
    expect(newState.posts[0].id).toBe(1)


});


