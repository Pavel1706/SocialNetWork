import React from 'react';
import {usersAPI} from "../API/Api";
import {AppThunk} from "./reduxStore";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/helper/object-helpers";


let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

export type UserType = {
    id: number;
    name: string;
    status?: string;
    photos: {
        small?: string;
        large?: string;
    }
    followed: boolean
}

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}

export const usersReducer = (state = initialState, action: UsersActionsType): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':

            return {
                ...state,
                users: updateObjectInArray(state, action.userId,'id', {followed: true})
                // users: state.users.map(t => {
                //     if (t.id === action.userId) {
                //         return {...t, followed: true}
                //     }
                //     return t;
                // })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state, action.userId,'id', {followed: false})
                // users: state.users.map(t => {
                //     if (t.id === action.userId) {
                //         return {...t, followed: false}
                //     }
                //     return t;
                // })
            }
        case "SET-USERS":
            return {...state, users: action.users}
        case 'SET-CURRENT-PAGE':

            return {...state, currentPage: action.currentPage}
        case 'SET-TOTAL-COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'SET-TOGGlE-IS-FETCHING':
            return {...state, isFetching: action.loading}
        case 'SET-TOGGlE-IS-FOLLOWING': {
            return {
                ...state,
                followingInProgress: action.following
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

export const followAC = (userId: number) => {
    return {
        type: "FOLLOW",
        userId: userId
    } as const
}

export const unFollowAC = (userId: number) => {
    return {
        type: "UNFOLLOW",
        userId: userId
    } as const
}
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: "SET-USERS",
        users: users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage: currentPage
    } as const
}
export const setUsersTotalCountAC = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-COUNT',
        totalCount: totalCount
    } as const
}
export const setToggleIsFetchingAC = (loading: boolean) => {
    return {
        type: 'SET-TOGGlE-IS-FETCHING',
        loading: loading
    } as const
}
export const setToggleIsFollowingAC = (following: boolean, userId: number) => {
    return {
        type: 'SET-TOGGlE-IS-FOLLOWING',
        following: following,
        userId: userId,
    } as const
}

type setToggleIsFetchingACType = ReturnType<typeof setToggleIsFetchingAC>
type setToggleIsFollowingACType = ReturnType<typeof setToggleIsFollowingAC>
type setUsersTotalCountType = ReturnType<typeof setUsersTotalCountAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type ChangeUserFollowType = ReturnType<typeof followAC>
type ChangeUserUnFollowType = ReturnType<typeof unFollowAC>
type SetUsersType = ReturnType<typeof setUsersAC>


export type UsersActionsType = ChangeUserFollowType | ChangeUserUnFollowType
    | SetUsersType | SetCurrentPageType | setUsersTotalCountType | setToggleIsFetchingACType
    | setToggleIsFollowingACType


// type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionType>
//
// const getTodolists = ():ThunkType  => {
//     return (dispatch, getState: ()=> AppStateType) => {
//         api.getTodolists()
//             .then(res => {тема
//                 dispatch(getTodolistsSuccess(res.data));
//             })
//     };
// };
export const getUsersTC = (page: number,pageSize:number): AppThunk =>{
   return async (dispatch) => {
       dispatch(setToggleIsFetchingAC(true))
       dispatch(setCurrentPageAC(page))
       let data = await usersAPI.getUsers(page, pageSize)
       dispatch(setToggleIsFetchingAC(false))
       dispatch(setUsersAC(data.items))
       dispatch(setUsersTotalCountAC(data.totalCount))
   }
}

const followUnfollowFlow= async(dispatch: Dispatch, userId:number, apiMethod:any, actionCreator:any)=>{
    dispatch(setToggleIsFollowingAC(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setToggleIsFollowingAC(false, userId))
}

export const followUserTC = (userId: number):AppThunk =>{
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI)
        let actionCreator= followAC
        followUnfollowFlow(dispatch,userId,apiMethod,actionCreator)
    }
}

export const unFollowUserTC = (userId: number):AppThunk =>{
   return async(dispatch) => {
       let apiMethod = usersAPI.unFollow.bind(usersAPI)
       let actionCreator= unFollowAC
       followUnfollowFlow(dispatch,userId,apiMethod,actionCreator)
   }
}




// export const getUsersThunkCreator = (currentPage: number,pageSize:number) => {
//     return (dispatch: Dispatch<UsersActionsType>) => {
//         dispatch(setToggleIsFetchingAC(true))
//         usersAPI.getUsers(currentPage, pageSize)
//             .then(data => {
//                 dispatch(setToggleIsFetchingAC(false))
//                 dispatch(setUsersAC(data.items))
//                 dispatch(setUsersTotalCountAC(data.totalCount))
//             })
//     }
// }

