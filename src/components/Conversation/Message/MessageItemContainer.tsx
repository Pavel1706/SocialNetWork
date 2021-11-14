import React from 'react';
import {AppStateType} from "../../../Redux/reduxStore";
import {MessageItem} from "./MessageItem";
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {addNewMessageAC, InitialStateMessageType} from "../../../Redux/messageReducer";

type MessageStatePropsType = {
    messagePage: InitialStateMessageType
    newMessage: string
    isAuth:boolean

}
type MapDispatchPropsType = {
    sendMessage: (value:string) => void
}
let messageStateToProps = (state: AppStateType): MessageStatePropsType => {
    return {
        messagePage: state.messagePage,
        newMessage: state.messagePage.newMessage,
        isAuth: state.auth.isAuth
    }
}

export type AllMessageType = MessageStatePropsType & MapDispatchPropsType

let messageDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (value: string) => {
            dispatch(addNewMessageAC(value))
        }
    }
}


export const SuperMessageContainer = connect(messageStateToProps, messageDispatchToProps)(MessageItem);