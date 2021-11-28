import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {NewProfileType} from "../../Redux/profileReducer";
import {SuperDialogsContainer} from "./myPosts/MyPostsContainer";

type ProfilePropsType = {
    profile: NewProfileType | null
    status: string
    updateStatus:(value:string)=> void
    isOwner: boolean
    savePhoto:(photo:any)=>void
    saveProfile: (profile: NewProfileType) => Promise<any>
}

export const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo    isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                            saveProfile={props.saveProfile}
            />
            <SuperDialogsContainer      />
        </div>
    )
}