import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import {connect, useDispatch} from 'react-redux';
import {AppStateType} from "../../Redux/reduxStore";
import {
    getProfileStatusTC,
    NewProfileType, savePhotoTC,
    saveProfileTC,
    setProfileTC,
    updateStatusTC
} from "../../Redux/profileReducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';


type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    profile: NewProfileType | null
    status: string
    isAuth: boolean
    authorizedUserId: number
}

type MapDispatchPropsType = {
    setUserProfile: (profile: NewProfileType) => void
    upDateStatus: (value: string) => void
    savePhoto:(photo:any)=> void
    saveProfile: (profile: NewProfileType) => Promise<any>
}
type UsersStateType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & UsersStateType

function ProfileContainer(props: PropsType) {
    let userId = props.match.params.userId
    const dispatch = useDispatch()
    useEffect(() => {

        if (!userId) {
            userId = props.authorizedUserId.toString()
        }
        if (!userId) {
            props.history.push("/login")

        }
        dispatch(setProfileTC(+userId))
        dispatch(getProfileStatusTC(userId))
    }, [userId])

    return (
        <Profile profile={props.profile}
                 isOwner={!userId}
                 status={props.status}
                 updateStatus={props.upDateStatus}
                 savePhoto={props.savePhoto}
                 saveProfile={props.saveProfile}
        />
    )

}


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.data.id,
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        setUserProfile: setProfileTC,
        getStatus: getProfileStatusTC,
        upDateStatus: updateStatusTC,
        savePhoto: savePhotoTC,
        saveProfile: saveProfileTC
    }),
    withRouter,
)(ProfileContainer)