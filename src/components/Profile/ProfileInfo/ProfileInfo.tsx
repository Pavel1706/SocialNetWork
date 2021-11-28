import React, {ChangeEvent, useState} from 'react';
import style from './ProfileInfo.module.css';
import {Preloader} from "../../common/Preloader/Preloader";
import {ContactsType, NewProfileType} from "../../../Redux/profileReducer";
import {ProfileStatusWithHooks} from "../ProfileStatusWithHooks";
import {useDispatch} from "react-redux";
import ProfileDataForm from './ProfileDataForm';

type ProfileType = {
    profile: NewProfileType | null
    status: string
    updateStatus: (value: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
    saveProfile: (profile: NewProfileType) => Promise<any>
}


export const ProfileInfo: React.FC<ProfileType> = ({
                                                       profile,
                                                       status,
                                                       updateStatus,
                                                       isOwner,
                                                       savePhoto,
                                                       saveProfile
                                                   }) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)


    if (!profile) {
        return <Preloader loading={true}/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }


    const onSubmit = (formData: NewProfileType) => {
        console.log(formData)
        saveProfile(formData)
            .then(() => {
                setEditMode(false)
            })

    }


    return (
        <div>
            <div>
                <img alt={'foto'}
                     src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg'/>
            </div>
            <div className={style.descriptionBlock}>

                <img className={style.photo}
                     src={profile.photos.small || 'https://avatarko.ru/img/kartinka/7/zhivotnye_sobaka_6243.jpg'}/>
                {isOwner && <input type={'file'} onChange={mainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

            </div>

        </div>
    )
}


type ProfileDataType = {
    profile: NewProfileType
    isOwner: boolean
    goToEditMode: () => void
}


const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {
            Object
                .keys(profile.contacts)
                .map((key) => {
                    return <Contacts key={key} contactTitle={key}
                                     contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string | null
}

const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}