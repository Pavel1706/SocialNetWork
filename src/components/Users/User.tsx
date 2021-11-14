import React from 'react';
import styles from "./users.module.css";
import {UserType} from "../../Redux/usersReducer";
import {NavLink} from 'react-router-dom';


type SingleUserType = {
    user: UserType
    followingInProgress: Array<number>
    setToggleIsFollowing: (value: boolean, userId:number) => void
    followUserTC:(userId:number)=> void
    unFollowUserTC:(userId:number)=> void

}


export let User = (props:SingleUserType) => {
    let user = props.user
    return <div>
           <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img
                            src={user.photos.small != null ? user.photos.small : 'https://i.pinimg.com/736x/9b/80/f0/9b80f06c91e4c03c63059d35ff943168.jpg'}
                            className={styles.photo}/>
                            </NavLink>
                    </div>
                    <div>
                        {
                            user.followed
                                ?
                                <button disabled={props.followingInProgress.some(id=>id===user.id)} onClick={() => {

                                    props.setToggleIsFollowing(true,user.id)
                                      props.unFollowUserTC(user.id)


                                }}>UnFollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id=>id===user.id)} onClick={() => {

                                    props.setToggleIsFollowing(true,user.id)
                                    props.followUserTC(user.id)

                                }}>Follow</button>

                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                </span>

    </div>
}
