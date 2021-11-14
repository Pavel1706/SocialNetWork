import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {NewProfileType} from "../../Redux/profileReducer";
import {SuperDialogsContainer} from "./myPosts/MyPostsContainer";

type ProfilePropsType = {
    profile: NewProfileType | null
    status: string
    updateStatus:(value:string)=> void
}

export const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <SuperDialogsContainer      />
        </div>
    )
}