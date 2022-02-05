import React from 'react';
import {UserType} from "../../Redux/usersReducer";
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

type UsersStateType = {
    usersState: Array<UserType>
    setUsers: (users: Array<UserType>) => void;
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setCurrent: (value: number) => void
    setTotalUsersCount: (value: number) => void
    onPageChanged: (value: number) => void
    setToggleIsFetching: (value: boolean) => void
    setToggleIsFollowing: (value: boolean, userId:number) => void
    followingInProgress: Array<number>
    followUserTC:(userId:number)=> void
    unFollowUserTC:(userId:number)=> void

}


export let Users = (props: UsersStateType) => {

    return <div>


        {
            props.usersState.map(t =>  <User key={t.id}
                                                user={t}
                                             followingInProgress={props.followingInProgress}
                                             setToggleIsFollowing={props.setToggleIsFollowing}
                                             followUserTC={props.followUserTC}
                                             unFollowUserTC={props.unFollowUserTC}   />)

        

        }
        <Paginator pageSize={props.pageSize}
                   totalUsersCount={props.totalUsersCount}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   portionSize={10}/>
    </div>
}
