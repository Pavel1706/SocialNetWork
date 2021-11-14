import React from 'react';
import {MyPosts} from "./MyPosts";
import {connect} from 'react-redux';
import {AppStateType} from "../../../Redux/reduxStore";
import {addPostAC,  InitialStateType} from "../../../Redux/profileReducer";
import {Dispatch} from 'redux';


type MapStatePropsType = {
    profilePage: InitialStateType

}
type MapDispatchPropsType = {
    addPost: (value:string) => void
}
export type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}


let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        // updateNewText: (text: string) => {
        //     dispatch(changeNewTextAC(text))
        // },
        addPost: (value:string) => {
            dispatch(addPostAC(value))
        }
    }
}


export const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);