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

        <Paginator pageSize={props.pageSize} totalUsersCount={props.totalUsersCount} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        {
            props.usersState.map(t =>  <User key={t.id}
                                                user={t}
                                             followingInProgress={props.followingInProgress}
                                             setToggleIsFollowing={props.setToggleIsFollowing}
                                             followUserTC={props.followUserTC}
                                             unFollowUserTC={props.unFollowUserTC}   />)
                // <span>
                //     <div>
                //         <NavLink to={'/profile/' + t.id}>
                //         <img
                //             src={t.photos.small != null ? t.photos.small : 'https://i.pinimg.com/736x/9b/80/f0/9b80f06c91e4c03c63059d35ff943168.jpg'}
                //             className={styles.photo}/>
                //             </NavLink>
                //     </div>
                //     <div>
                //         {
                //             t.followed
                //                 ?
                //                 <button disabled={props.followingInProgress.some(id=>id===t.id)} onClick={() => {
                //
                //                     props.setToggleIsFollowing(true,t.id)
                //                       props.unFollowUserTC(t.id)
                //
                //
                //                 }}>UnFollow</button>
                //                 :
                //                 <button disabled={props.followingInProgress.some(id=>id===t.id)} onClick={() => {
                //
                //                     props.setToggleIsFollowing(true,t.id)
                //                     props.followUserTC(t.id)
                //
                //                 }}>Follow</button>
                //
                //         }
                //     </div>
                // </span>
                // <span>
                //     <span>
                //         <div>{t.name}</div>
                //         <div>{t.status}</div>
                //     </span>
                // </span>

        }
    </div>
}
