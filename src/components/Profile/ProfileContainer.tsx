import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import {connect, useDispatch} from 'react-redux';
import {AppStateType} from "../../Redux/reduxStore";
import {
    getProfileStatusTC,
    NewProfileType,
    setProfileTC,
     updateStatusTC
} from "../../Redux/profileReducer";
import { RouteComponentProps, withRouter} from 'react-router-dom';
import { compose } from 'redux';




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
    upDateStatus: (value:string)=> void
}
type UsersStateType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & UsersStateType

function ProfileContainer(props: PropsType) {

    const dispatch = useDispatch()
    useEffect(() => {

        let userId = props.match.params.userId
        debugger
        if (!userId) {
            userId = props.authorizedUserId.toString()
        }
        //     if(!userId){
        //         props.history.push("/login")
        //
        // }
        dispatch(setProfileTC(userId))
            dispatch(getProfileStatusTC(userId))
    }, [])

    return (
        <Profile profile={props.profile}
                 status={props.status}
                 updateStatus={props.upDateStatus}/>
    )

}




const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.data.id,
})


export default compose<React.ComponentType>(
    connect(mapStateToProps, {setUserProfile: setProfileTC,
        getStatus:getProfileStatusTC,
        upDateStatus:updateStatusTC}),
    withRouter,
)(ProfileContainer)