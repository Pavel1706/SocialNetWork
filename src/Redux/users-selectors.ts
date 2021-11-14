import { createSelector } from "reselect";
import {AppStateType} from "./reduxStore";
import {UserType} from "./usersReducer";


// export const getUsersSelector = (state: AppStateType) => {
//     return getUsers(state).filter(t=>true)
// }

 const getUsersSelector = (state: AppStateType) => {

     return state.users.users
 }

export const getUsers = createSelector(getUsersSelector,

    (users:Array<UserType>)=>{

        return users.filter(t=>true)
})

export const getPageSize = (state: AppStateType) => {
    return state.users.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.users.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.users.currentPage
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.users.followingInProgress
}
export const getIsFetching = (state: AppStateType) => {
    return state.users.isFetching
}