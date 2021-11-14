import React from 'react';
import style from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {NewProfileType} from "../../../Redux/profileReducer";
import { ProfileStatus } from '../ProfileStatus';
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";

type ProfileType = {
    profile: NewProfileType | null
    status: string
    updateStatus: (value:string)=> void
}


export const ProfileInfo = (props:ProfileType ) => {

    if(!props.profile){
        return <Preloader loading={true} />
    }

    return (
        <div>
            <div>
                <img alt={'foto'}
                    src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg'/>
            </div>
            <div className={style.descriptionBlock}>

                <img className={style.photo}  src={props.profile.photos.small||'https://avatarko.ru/img/kartinka/7/zhivotnye_sobaka_6243.jpg'}/>
                {props.profile.fullName}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                {/*<ProfileStatus status={props.status} updateStatus={props.updateStatus}/>*/}
            </div>

        </div>
    )
}