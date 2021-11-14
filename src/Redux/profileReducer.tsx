import React from 'react';
import {ProfileType} from "./State";
import {AppThunk} from "./reduxStore";
import {profileAPI} from "../API/Api";


let initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hello! How`s life?', like: 22},
        {id: 2, message: 'Hey hey! How`re you things?', like: 15},
        {id: 3, message: 'Hey buddy! How`re you?', like: 35},
        {id: 4, message: 'Hey there! Take it easy?', like: 77},
    ],
    profile: {
        userId: 19583,
        lookingForAJob: true,
        lookingForAJobDescription: 'it will be fun',
        fullName: 'Potapiсh',
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null,
        },
        photos: {
            small: 'https://avatarko.ru/img/kartinka/7/zhivotnye_sobaka_6243.jpg',
            large: 'https://avatarko.ru/img/kartinka/7/zhivotnye_sobaka_6243.jpg'
        }
    },
    status: '',
    updateStatus: '',
}
type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type NewProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: {
        small: string
        large: string
    }
}
export type InitialStateType = {
    posts: Array<ProfileType>
    // newPostText: string
    profile: NewProfileType | null
    status: string
    updateStatus: string


}

export const profileReducer = (state = initialState, action: ProfileActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST':

            let newPost: ProfileType = {
                id: new Date().getTime(),
                message: action.value,
                like: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],

            }
        case 'SET-USER-PROFILE':

            return {

                ...state, profile: action.profile
            }
        case "SET-USER-STATUS":
            return {
                ...state, status: action.status
            }
        case "DELETE POST":
            return {
                ...state, posts: state.posts.filter(t => t.id !== action.id)
            }
        default:
            return state
    }
}

export const changeNewTextAC = (newText: string) => {
    return {
        type: "CHANGE-NEW-TEXT",
        newText: newText
    } as const
}

export const addPostAC = (value: string) => {
    return {
        type: "ADD-POST",
        value: value,

    } as const
}
export const setUserProfileAC = (profile: NewProfileType) => {
    return {
        type: 'SET-USER-PROFILE',
        profile: profile
    } as const
}
export const setStatusAC = (status: string) => {
    return {
        type: 'SET-USER-STATUS',
        status: status
    } as const
}

export const deletePostAC = (id: number) => {
    return {
        type: 'DELETE POST',
        id: id
    } as const
}


type ChangeNewTextActionType = ReturnType<typeof changeNewTextAC>
type SetUserProfileType = ReturnType<typeof setUserProfileAC>
type GetUserProfileType = ReturnType<typeof setStatusAC>
type AddPostActionType = ReturnType<typeof addPostAC>
type DeletePstType = ReturnType<typeof deletePostAC>

export type ProfileActionsType = ChangeNewTextActionType | AddPostActionType
    | SetUserProfileType | GetUserProfileType | DeletePstType

export const setProfileTC = (userId: string): AppThunk => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfileAC(response.data))
            })
    }
}
export const getProfileStatusTC = (userId: string): AppThunk => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(response.data))
    }
    }

export const updateStatusTC = (status: string): AppThunk => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    }
}